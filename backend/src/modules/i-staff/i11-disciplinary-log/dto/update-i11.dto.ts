import { PartialType } from '@nestjs/swagger';
import { CreateI11Dto } from './create-i11.dto';

export class UpdateI11Dto extends PartialType(CreateI11Dto) {}
