import { PartialType } from '@nestjs/swagger';
import { CreateL04Dto } from './create-l04.dto';

export class UpdateL04Dto extends PartialType(CreateL04Dto) {}
