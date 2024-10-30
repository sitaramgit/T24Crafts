import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)  // Inject Schedule repository
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  create(createScheduleDto: CreateScheduleDto | any) {
    const { userId, productionTitle, selectedDates, createdBy, managerId = null, hoursWorked = 0 } = createScheduleDto;

    try {
      // Ensure required fields are provided
      if (!userId || !productionTitle || !selectedDates || !createdBy) {
        throw new Error('Missing required fields: userId, productionTitle, selectedDates, or createdBy');
      }
  
      // Iterate through each date and create a separate Schedule record
      const schedules = selectedDates.map((date) => {
        return this.scheduleRepository.create({
          userId,
          productionTitle,
          workDate: new Date(date), // Set each date individually
          createdBy,
          managerId,         // Optional, defaults to null
          hoursWorked,       // Optional, defaults to 0
        });
      });
  
      // Save all records in bulk and return success response
       this.scheduleRepository.save(schedules);
      return {
        success: true,
        message: 'Schedules created successfully',
        createdRecords: schedules.length,
      };
  
    } catch (error: any) {
      // Log the error for debugging
      console.error('Error creating schedules:', error.message);
  
      return {
        success: false,
        message: 'Failed to create schedules',
        error: error.message,
      };
    }
  }
   getSchedulesByUserAndDate = async (userId: number, month: number, year: number) => {
  
    try {
      // Query schedules by userId and specific month and year
      const schedules = await this.scheduleRepository.createQueryBuilder('schedule')
        .where('schedule.userId = :userId', { userId })
        .andWhere('EXTRACT(MONTH FROM schedule.workDate) = :month', { month })
        .andWhere('EXTRACT(YEAR FROM schedule.workDate) = :year', { year })
        .getMany();
  
      return {
        success: true,
        message: `Schedules fetched for userId ${userId} for month ${month} and year ${year}`,
        data: schedules,
      };
  
    } catch (error: any) {
      console.error('Error fetching schedules:', error.message);
  
      return {
        success: false,
        message: 'Failed to fetch schedules',
        error: error.message,
      };
    }
  };
  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
