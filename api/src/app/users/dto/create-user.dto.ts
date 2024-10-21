export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile?: string;
    socialName?: string;
    socialPicture?: string;
    isSocialUser?: boolean;
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    loginSource?: 'GOOGLE' | 'FACEBOOK' | 'INSTAGRAM' | 'EMAIL';
    roles: number[]; // Role IDs
  }
  