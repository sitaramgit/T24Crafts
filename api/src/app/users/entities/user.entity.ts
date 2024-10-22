import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Non-null assertion

  @Column()
  firstName!: string; // Non-null assertion

  @Column()
  lastName!: string; // Non-null assertion

  @Column({ unique: true })
  email!: string; // Non-null assertion

  @Column()
  password!: string; // Non-null assertion

  @Column()
  mobile!: string; // Non-null assertion

  @Column()
  socialName!: string; // Non-null assertion

  @Column({ nullable: false })
  loginSource!: string; // Non-null assertion

  @Column({ nullable: true })
  socialPicture!: string; // Non-null assertion

  @Column({ default: false })
  isSocialUser!: boolean; // Non-null assertion

  @Column({ default: 'active' })
  status!: string; // Non-null assertion

  @Column({ nullable: true })
  token!: string; // Non-null assertion

  @Column()
  createdAt!: Date; // Non-null assertion

  @Column({ nullable: true })
  updatedAt!: Date; // Non-null assertion

  // Correctly define the relationship without initialization
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]; // No initialization here

}
