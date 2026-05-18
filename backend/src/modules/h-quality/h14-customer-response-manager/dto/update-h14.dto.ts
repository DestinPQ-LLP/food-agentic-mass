import { PartialType } from '@nestjs/swagger';
import { CreateH14Dto } from './create-h14.dto';

export class UpdateH14Dto extends PartialType(CreateH14Dto) {}
