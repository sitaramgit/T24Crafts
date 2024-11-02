import { Controller, Post, Param, Body, Patch, Get, ParseIntPipe } from '@nestjs/common';
import { DatesManagerRequestService } from './dates-manager-request.service';
import { User } from '../users/entities/user.entity';


@Controller('dates-manager-requests')
export class DatesManagerRequestController {
  constructor(private readonly datesManagerRequestService: DatesManagerRequestService) {}

  @Post(':artistId/:managerId')
  async createRequest(
    @Param('artistId', ParseIntPipe) artistId: any,
    @Param('managerId', ParseIntPipe) managerId: any,
  ) {

    return this.datesManagerRequestService.createRequest(artistId, managerId);
  }

  @Patch(':id/status')
  async updateRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'Approved' | 'Rejected',
  ) {
    return this.datesManagerRequestService.updateRequestStatus(id, status);
  }

  @Get('artist/:artistId')
  async getRequestsByArtist(@Param('artistId', ParseIntPipe) artistId: number) {
    return this.datesManagerRequestService.findRequestsByArtist(artistId);
  }

  @Get('manager/:managerId')
  async getRequestsByManager(@Param('managerId', ParseIntPipe) managerId: number) {
    return this.datesManagerRequestService.findRequestsByManager(managerId);
  }
}
