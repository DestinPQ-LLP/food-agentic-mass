import { PartialType } from '@nestjs/swagger';
import { CreateL16Dto } from './create-l16.dto';

export class UpdateL16Dto extends PartialType(CreateL16Dto) {}
