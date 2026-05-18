import { PartialType } from '@nestjs/swagger';
import { CreateI13Dto } from './create-i13.dto';

export class UpdateI13Dto extends PartialType(CreateI13Dto) {}
