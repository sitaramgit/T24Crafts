import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatesManagerRequest } from './entities/dates-manager-request.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsGateway } from '../sockets/notifications.gateway';
@Injectable()
export class DatesManagerRequestService {
  constructor(
    @InjectRepository(DatesManagerRequest)
    private readonly datesManagerRequestRepository: Repository<DatesManagerRequest>,
    private readonly notificationsGateway: NotificationsGateway,
    @InjectRepository(User)  // Inject User repository
    private readonly userRepository: Repository<User>,
  ) {}

  async createRequest(artistId: any, managerId: any): Promise<DatesManagerRequest> {
    if (!artistId || !managerId) {
      throw new Error('Both artistId and managerId must be provided');
  }

  const artist = await this.userRepository.findOne({ where: { id: artistId } });
  const manager = await this.userRepository.findOne({ where: { id: managerId } });

  if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
  }

  if (!manager) {
      throw new NotFoundException(`Manager with ID ${managerId} not found`);
  }

    const request = this.datesManagerRequestRepository.create({
        artist: artist,
        manager: manager,
        status: 'Pending',
    });
//      // Notify artist about the new request
  this.notificationsGateway.notifyArtist(
    artist.id,
    `You have a new date management request from ${manager.email}.`
);

    return this.datesManagerRequestRepository.save(request);
}

  async updateRequestStatus(id: number, status: 'Approved' | 'Rejected'): Promise<DatesManagerRequest> {
    const request: any = await this.datesManagerRequestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }
  
    request.status = status;
    request.responseDate = new Date();
    const updatedRequest = await this.datesManagerRequestRepository.save(request);
  
    // Notify manager with status update
    this.notificationsGateway.notifyManager(
      request.manager.id,
      `Your request to manage dates for ${request.artist.name} was ${status.toLowerCase()}.`
    );
  
    // Emit real-time status update for the manager's button
    this.notificationsGateway.server.to(`manager_${request.manager.id}`).emit('statusUpdate', {
      requestId: request.id,
      status: status,
    });
  
    return updatedRequest;
  }

  async findRequestsByArtist(artistId: number): Promise<DatesManagerRequest[]> {
    return this.datesManagerRequestRepository.find({
      where: { artist: { id: artistId } },
      relations: ['artist', 'manager'],
    });
  }

  async findRequestsByManager(managerId: number): Promise<DatesManagerRequest[]> {
    return this.datesManagerRequestRepository.find({
      where: { manager: { id: managerId } },
      relations: ['artist', 'manager'],
    });
  }
}
