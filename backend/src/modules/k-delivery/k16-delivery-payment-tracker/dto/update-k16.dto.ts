import { PartialType } from '@nestjs/swagger';
import { CreateK16Dto } from './create-k16.dto';

export class UpdateK16Dto extends PartialType(CreateK16Dto) {}
