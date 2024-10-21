
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
// import { User } from '../../users/'; // Assuming User entity exists

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  role: string;  // Enum for roles like Artist, Manager, etc.

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  // Add other profile details as needed
}
