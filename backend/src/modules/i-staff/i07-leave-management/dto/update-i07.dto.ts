import { PartialType } from '@nestjs/swagger';
import { CreateI07Dto } from './create-i07.dto';

export class UpdateI07Dto extends PartialType(CreateI07Dto) {}
