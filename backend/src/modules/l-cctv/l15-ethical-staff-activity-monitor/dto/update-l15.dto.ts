import { PartialType } from '@nestjs/swagger';
import { CreateL15Dto } from './create-l15.dto';

export class UpdateL15Dto extends PartialType(CreateL15Dto) {}
