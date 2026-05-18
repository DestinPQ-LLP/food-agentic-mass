import { PartialType } from '@nestjs/swagger';
import { CreateK14Dto } from './create-k14.dto';

export class UpdateK14Dto extends PartialType(CreateK14Dto) {}
