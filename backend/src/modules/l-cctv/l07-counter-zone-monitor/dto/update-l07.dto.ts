import { PartialType } from '@nestjs/swagger';
import { CreateL07Dto } from './create-l07.dto';

export class UpdateL07Dto extends PartialType(CreateL07Dto) {}
