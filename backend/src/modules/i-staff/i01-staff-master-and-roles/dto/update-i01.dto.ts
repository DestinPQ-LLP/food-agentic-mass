import { PartialType } from '@nestjs/swagger';
import { CreateI01Dto } from './create-i01.dto';

export class UpdateI01Dto extends PartialType(CreateI01Dto) {}
