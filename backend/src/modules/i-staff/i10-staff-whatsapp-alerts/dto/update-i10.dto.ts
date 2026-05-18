import { PartialType } from '@nestjs/swagger';
import { CreateI10Dto } from './create-i10.dto';

export class UpdateI10Dto extends PartialType(CreateI10Dto) {}
