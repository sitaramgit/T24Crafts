import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('DatesManagerRequests')
export class DatesManagerRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'artist_id' })
  artist: User;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected';

  @CreateDateColumn({ name: 'request_date' })
  requestDate: Date;

  @UpdateDateColumn({ name: 'response_date', nullable: true })
  responseDate: Date;
}
