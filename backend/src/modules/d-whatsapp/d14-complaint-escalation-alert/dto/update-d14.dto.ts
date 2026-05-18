import { PartialType } from '@nestjs/swagger';
import { CreateD14Dto } from './create-d14.dto';

export class UpdateD14Dto extends PartialType(CreateD14Dto) {}
