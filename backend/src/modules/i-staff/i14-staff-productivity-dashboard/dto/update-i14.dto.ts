import { PartialType } from '@nestjs/swagger';
import { CreateI14Dto } from './create-i14.dto';

export class UpdateI14Dto extends PartialType(CreateI14Dto) {}
