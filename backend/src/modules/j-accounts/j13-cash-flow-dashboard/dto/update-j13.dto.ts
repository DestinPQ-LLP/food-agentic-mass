import { PartialType } from '@nestjs/swagger';
import { CreateJ13Dto } from './create-j13.dto';

export class UpdateJ13Dto extends PartialType(CreateJ13Dto) {}
