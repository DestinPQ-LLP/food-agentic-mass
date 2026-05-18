import { PartialType } from '@nestjs/swagger';
import { CreateI04Dto } from './create-i04.dto';

export class UpdateI04Dto extends PartialType(CreateI04Dto) {}
