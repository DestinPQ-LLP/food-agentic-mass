import { PartialType } from '@nestjs/swagger';
import { CreateN10Dto } from './create-n10.dto';

export class UpdateN10Dto extends PartialType(CreateN10Dto) {}
