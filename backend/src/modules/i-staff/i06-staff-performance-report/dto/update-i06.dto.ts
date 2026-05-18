import { PartialType } from '@nestjs/swagger';
import { CreateI06Dto } from './create-i06.dto';

export class UpdateI06Dto extends PartialType(CreateI06Dto) {}
