import { PartialType } from '@nestjs/swagger';
import { CreateJ05Dto } from './create-j05.dto';

export class UpdateJ05Dto extends PartialType(CreateJ05Dto) {}
