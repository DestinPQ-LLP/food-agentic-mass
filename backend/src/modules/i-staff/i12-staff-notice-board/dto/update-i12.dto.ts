import { PartialType } from '@nestjs/swagger';
import { CreateI12Dto } from './create-i12.dto';

export class UpdateI12Dto extends PartialType(CreateI12Dto) {}
