import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false, name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false, name: 'updated_at' })
  updated_at: Date;
}
