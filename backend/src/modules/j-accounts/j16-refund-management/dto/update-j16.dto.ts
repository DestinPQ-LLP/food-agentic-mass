import { PartialType } from '@nestjs/swagger';
import { CreateJ16Dto } from './create-j16.dto';

export class UpdateJ16Dto extends PartialType(CreateJ16Dto) {}
