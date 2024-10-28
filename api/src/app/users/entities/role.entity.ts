import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;

  @Column({ default: false })
  active: boolean;
}

export enum UserRole {
  ARTIST = 'Artist',
  JUNIOR_ARTIST = 'Junior artist',
  DIRECTOR = 'Director',
  PRODUCER = 'Producer/ Production company',
  MANAGER = 'Manager',
  ASSISTANT_DIRECTOR = 'Assistant director',
  CAMERA_MAN = 'Camera man',
  ASSISTANT_CAMERA_MAN = 'Assistant cameraman',
  CHOREOGRAPHER = 'Choreographer',
  ASSISTANT_CHOREOGRAPHER = 'Assistant Choreographer',
  DANCER = 'Dancer',
  ART_DIRECTOR = 'Art director',
  ART_ASSISTANT = 'Art assistant',
  SET_ASSISTANT = 'Set assistant',
  SET_BOY = 'Set Boy',
  DUBBING_ARTIST = 'Dubbing artist',
  SINGER = 'Singer',
  MUSIC_DIRECTOR = 'Music director',
  MAKEUP_ARTIST = 'Makeup artiste',
  MAKEUP_ASSISTANT = 'Makeup assistant',
  EDITOR = 'Editor',
}
