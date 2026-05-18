import { PartialType } from '@nestjs/swagger';
import { CreateD05Dto } from './create-d05.dto';

export class UpdateD05Dto extends PartialType(CreateD05Dto) {}
