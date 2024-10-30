import { IsString, IsDateString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
export class CreateUserProfileDto {
    @IsNotEmpty()
    firstname: string;
  
    @IsNotEmpty()
    lastname: string;
  
    @IsNotEmpty()
    address: string;
  
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    @IsDateString() // Ensure it's a valid date format
    dob: string; // or Date, depending on how you want to handle it
  
    @IsNotEmpty()
    gender: string;
  
    @IsNotEmpty()
    role: number;

    mobile!: string;
  
    @IsNotEmpty()
    userId: number; // Ensure this is of type number
}
