import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', {
    nullable: true,
  })
  search: string;

  @Column('text', {
    nullable: true,
  })
  latitude: string;

  @Column('text', {
    nullable: true,
  })
  longitude: string;
}
