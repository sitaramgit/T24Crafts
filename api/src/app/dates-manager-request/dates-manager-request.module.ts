import { Module } from '@nestjs/common';
import { DatesManagerRequestService } from './dates-manager-request.service';
import { DatesManagerRequestController } from './dates-manager-request.controller';
import { DatesManagerRequest } from './entities/dates-manager-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsGateway } from '../sockets/notifications.gateway';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatesManagerRequest, User])],
  controllers: [DatesManagerRequestController],
  providers: [DatesManagerRequestService, NotificationsGateway]
})
export class DatesManagerRequestModule {}
