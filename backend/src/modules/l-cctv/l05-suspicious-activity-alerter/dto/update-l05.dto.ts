import { PartialType } from '@nestjs/swagger';
import { CreateL05Dto } from './create-l05.dto';

export class UpdateL05Dto extends PartialType(CreateL05Dto) {}
