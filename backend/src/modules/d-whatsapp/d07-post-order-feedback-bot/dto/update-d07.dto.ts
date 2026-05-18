import { PartialType } from '@nestjs/swagger';
import { CreateD07Dto } from './create-d07.dto';

export class UpdateD07Dto extends PartialType(CreateD07Dto) {}
