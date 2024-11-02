import { PartialType } from '@nestjs/mapped-types';
import { CreateDatesManagerRequestDto } from './create-dates-manager-request.dto';

export class UpdateDatesManagerRequestDto extends PartialType(CreateDatesManagerRequestDto) {}
