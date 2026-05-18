import { PartialType } from '@nestjs/swagger';
import { CreateJ04Dto } from './create-j04.dto';

export class UpdateJ04Dto extends PartialType(CreateJ04Dto) {}
