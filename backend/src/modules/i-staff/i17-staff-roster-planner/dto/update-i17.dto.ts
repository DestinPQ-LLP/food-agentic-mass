import { PartialType } from '@nestjs/swagger';
import { CreateI17Dto } from './create-i17.dto';

export class UpdateI17Dto extends PartialType(CreateI17Dto) {}
