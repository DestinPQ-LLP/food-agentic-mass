import { PartialType } from '@nestjs/swagger';
import { CreateJ07Dto } from './create-j07.dto';

export class UpdateJ07Dto extends PartialType(CreateJ07Dto) {}
