import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserProfile } from './user-profile/entities/user-profile.entity';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/entities/schedule.entity';
import { DatesManagerRequestModule } from './dates-manager-request/dates-manager-request.module';
import { DatesManagerRequest } from './dates-manager-request/entities/dates-manager-request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_t24db_dev',
      entities: [User, Role, UserProfile, Schedule, DatesManagerRequest],
      synchronize: false, // This automatically creates tables, use false in production!
    }),
    UsersModule,
    UserProfileModule,
    ScheduleModule,
    DatesManagerRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
