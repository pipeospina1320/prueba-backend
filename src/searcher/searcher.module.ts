import { Module } from '@nestjs/common';
import { SearcherService } from './searcher.service';
import { SearcherController } from './searcher.controller';
import { AuthModule } from 'src/security/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SearcherController],
  providers: [SearcherService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([History]),
    HttpModule,
    AuthModule,
  ],
})
export class SearcherModule {}
