import { PartialType } from '@nestjs/swagger';
import { CreateA07Dto } from './create-a07.dto';

export class UpdateA07Dto extends PartialType(CreateA07Dto) {}
