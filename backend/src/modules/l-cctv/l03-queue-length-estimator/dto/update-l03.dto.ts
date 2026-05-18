import { PartialType } from '@nestjs/swagger';
import { CreateL03Dto } from './create-l03.dto';

export class UpdateL03Dto extends PartialType(CreateL03Dto) {}
