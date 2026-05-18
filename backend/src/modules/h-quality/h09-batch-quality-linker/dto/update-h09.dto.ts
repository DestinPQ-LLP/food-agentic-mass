import { PartialType } from '@nestjs/swagger';
import { CreateH09Dto } from './create-h09.dto';

export class UpdateH09Dto extends PartialType(CreateH09Dto) {}
