import { PartialType } from '@nestjs/swagger';
import { CreateI15Dto } from './create-i15.dto';

export class UpdateI15Dto extends PartialType(CreateI15Dto) {}
