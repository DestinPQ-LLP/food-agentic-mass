import { PartialType } from '@nestjs/swagger';
import { CreateJ09Dto } from './create-j09.dto';

export class UpdateJ09Dto extends PartialType(CreateJ09Dto) {}
