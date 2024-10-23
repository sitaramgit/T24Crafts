import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,  // Inject the repository
    @InjectRepository(User)  // Inject User repository
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile>  {

     // Find the User entity based on userId from the DTO
     const user = await this.userRepository.findOne({
      where: { id: createUserProfileDto.userId },
    });

     if (!user) {
       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
     }
     // Check if a profile with the same userId already exists
    //  return this.createUserProfileDto;
     const existingProfile = await this.userProfileRepository.findOne({
      where: { user: { id: createUserProfileDto.userId } }, // Check by userId
    });
    console.log(existingProfile, 'checking')
    if (existingProfile) {
      // If a profile exists with the same userId, throw a 409 Conflict error
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'A profile for this user already exists',
        },
        HttpStatus.CONFLICT,
      );
    }


    // Save the new profile with the relationship
    return await this.userProfileRepository.save(createUserProfileDto);
  }

  findAll() {
    return `This action returns all userProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfile`;
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return `This action updates a #${id} userProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}
