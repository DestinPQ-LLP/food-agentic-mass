import { PartialType } from '@nestjs/swagger';
import { CreateL13Dto } from './create-l13.dto';

export class UpdateL13Dto extends PartialType(CreateL13Dto) {}
