import { PartialType } from '@nestjs/swagger';
import { CreateK07Dto } from './create-k07.dto';

export class UpdateK07Dto extends PartialType(CreateK07Dto) {}
