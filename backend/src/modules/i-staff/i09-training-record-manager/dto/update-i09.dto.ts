import { PartialType } from '@nestjs/swagger';
import { CreateI09Dto } from './create-i09.dto';

export class UpdateI09Dto extends PartialType(CreateI09Dto) {}
