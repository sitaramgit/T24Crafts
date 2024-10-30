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
      where: { userId: createUserProfileDto.userId }, // Check by userId
    });
 
    if (existingProfile) {
       // Call updateProfile method if profile already exists
       return this.updateProfile(existingProfile.id, createUserProfileDto);
    }
    // Save the new profile with the relationship
    return await this.userProfileRepository.save(createUserProfileDto);
  }

// Separate method to update profile with error handling
async updateProfile(profileId: number, updateUserProfileDto: UpdateUserProfileDto): Promise<any> {
  try {
    // Update the profile
    const updatedProfile = await this.userProfileRepository.update(profileId, updateUserProfileDto);

    return {
      message: 'Profile updated successfully',
      data: updatedProfile,
    };
  } catch (error) {
    if (error instanceof HttpException) {
      throw error; // Re-throw known HttpException
    }
    throw new HttpException(
      'Error occurred while updating profile',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

async getProfileByUserId(userId: number) {
  try {
    const profile = await this.userProfileRepository.findOne({
      where: { userId }, // Find profile by userId
    });

    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    return profile;
  } catch (error) {
    throw new HttpException(
      'Error occurred while retrieving profile',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
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
