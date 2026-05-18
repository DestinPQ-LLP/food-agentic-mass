import { PartialType } from '@nestjs/swagger';
import { CreateL06Dto } from './create-l06.dto';

export class UpdateL06Dto extends PartialType(CreateL06Dto) {}
