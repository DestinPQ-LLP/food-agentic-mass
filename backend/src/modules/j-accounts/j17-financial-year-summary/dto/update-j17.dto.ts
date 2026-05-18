import { PartialType } from '@nestjs/swagger';
import { CreateJ17Dto } from './create-j17.dto';

export class UpdateJ17Dto extends PartialType(CreateJ17Dto) {}
