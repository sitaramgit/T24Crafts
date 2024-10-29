
import { IsNotEmpty, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  managerId?: number;

  @IsString()
  @IsNotEmpty()
  productionTitle: string;

  @IsDateString()
  @IsNotEmpty()
  workDate: string;

  @IsNumber()
  @IsNotEmpty()
  hoursWorked: number;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}
