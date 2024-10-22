
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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

  @OneToOne(() => User) 
  @JoinColumn({ name: 'userId' }) // Creates the foreign key userId in UserProfile
  user: User;
}
