import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    // return createUserProfileDto;
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get(':userId')
  async getProfileByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProfileService.getProfileByUserId(userId);
  }

  @Get()
  findAll() {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfileService.update(+id, updateUserProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfileService.remove(+id);
  }
}
