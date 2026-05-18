import { PartialType } from '@nestjs/swagger';
import { CreateH13Dto } from './create-h13.dto';

export class UpdateH13Dto extends PartialType(CreateH13Dto) {}
