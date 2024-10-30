
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
// import { User } from '../../users/'; // Assuming User entity exists

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ default: '000-000-0000' }) // Set default value for mobile
  mobile!: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column()
  role: number;

  @Column()
  userId: number;

}
