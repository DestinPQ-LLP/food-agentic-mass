import { PartialType } from '@nestjs/swagger';
import { CreateI16Dto } from './create-i16.dto';

export class UpdateI16Dto extends PartialType(CreateI16Dto) {}
