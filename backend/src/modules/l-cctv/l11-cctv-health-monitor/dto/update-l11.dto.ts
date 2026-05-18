import { PartialType } from '@nestjs/swagger';
import { CreateL11Dto } from './create-l11.dto';

export class UpdateL11Dto extends PartialType(CreateL11Dto) {}
