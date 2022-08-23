import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseDefaultEntity } from 'src/base.entity';

@Entity('udi')
export class UdiEntity extends BaseDefaultEntity {
  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'timestamp', nullable: false, name: 'current_date' })
  currentDate: Date;
}
