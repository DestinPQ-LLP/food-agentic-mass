import { PartialType } from '@nestjs/swagger';
import { CreateA09Dto } from './create-a09.dto';

export class UpdateA09Dto extends PartialType(CreateA09Dto) {}
