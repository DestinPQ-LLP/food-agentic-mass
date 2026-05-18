import { PartialType } from '@nestjs/swagger';
import { CreateI02Dto } from './create-i02.dto';

export class UpdateI02Dto extends PartialType(CreateI02Dto) {}
