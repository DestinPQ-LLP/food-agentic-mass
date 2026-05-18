import { PartialType } from '@nestjs/swagger';
import { CreateJ14Dto } from './create-j14.dto';

export class UpdateJ14Dto extends PartialType(CreateJ14Dto) {}
