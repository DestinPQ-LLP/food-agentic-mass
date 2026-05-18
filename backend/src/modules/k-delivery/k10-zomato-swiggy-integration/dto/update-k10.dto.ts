import { PartialType } from '@nestjs/swagger';
import { CreateK10Dto } from './create-k10.dto';

export class UpdateK10Dto extends PartialType(CreateK10Dto) {}
