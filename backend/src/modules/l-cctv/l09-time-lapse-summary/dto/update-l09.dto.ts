import { PartialType } from '@nestjs/swagger';
import { CreateL09Dto } from './create-l09.dto';

export class UpdateL09Dto extends PartialType(CreateL09Dto) {}
