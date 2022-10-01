import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './security/auth/auth.module';
import { SearcherModule } from './searcher/searcher.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
      }),
    }),
    AuthModule,
    SearcherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
