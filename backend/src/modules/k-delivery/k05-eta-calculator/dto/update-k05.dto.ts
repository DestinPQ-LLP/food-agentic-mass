import { PartialType } from '@nestjs/swagger';
import { CreateK05Dto } from './create-k05.dto';

export class UpdateK05Dto extends PartialType(CreateK05Dto) {}
