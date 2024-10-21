import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  private oAuth2Client: OAuth2Client;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'postmessage',
    );

  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ firstName, lastName, email, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });

    try {
      await this.userRepository.save(newUser);
      return { message: 'User registered' };
    } catch (error) {
      console.error('Error registering user: ', error);
      throw new HttpException('Error registering user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }

  async googleLogin(code: string) {
    try {
       const { tokens }: any = await this.oAuth2Client.getToken(code);
    const googleToken: any = jwt.decode(tokens.id_token);
    const user = await this.userRepository.findOne({ where: { email: googleToken.email } });
    if (user) {
      // Update existing user token
      user.token = tokens.id_token;
      await this.userRepository.save(user);
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        socialPicture: user.socialPicture,
        isSocialUser: user.isSocialUser,
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      };
    } else {
      // Create new user
      const newUser = this.userRepository.create({
        firstName: googleToken.given_name,
        lastName: googleToken.family_name,
        email: googleToken.email,
        socialName: googleToken.name,
        socialPicture: googleToken.picture,
        token: tokens.id_token,
        isSocialUser: true,
        loginSource: 'GMAIL',
        password: await this.generateRandomPassword(5), // Generate a random password
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.userRepository.save(newUser);
      return {
        id: newUser.id,
        firstName: googleToken.given_name,
        lastName: googleToken.family_name,
        socialPicture: googleToken.picture,
        isSocialUser: true,
        token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      };
    }
  } catch (error) {
    console.error('Error in Google login:', error);
    throw new Error('Failed to authenticate with Google.');
}
  }

  private async generateRandomPassword(length: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
