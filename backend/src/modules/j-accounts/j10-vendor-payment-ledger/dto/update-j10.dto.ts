import { PartialType } from '@nestjs/swagger';
import { CreateJ10Dto } from './create-j10.dto';

export class UpdateJ10Dto extends PartialType(CreateJ10Dto) {}
