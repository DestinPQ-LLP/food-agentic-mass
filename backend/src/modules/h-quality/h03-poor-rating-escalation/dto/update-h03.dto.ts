import { PartialType } from '@nestjs/swagger';
import { CreateH03Dto } from './create-h03.dto';

export class UpdateH03Dto extends PartialType(CreateH03Dto) {}
