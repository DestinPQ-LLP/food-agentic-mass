import { PartialType } from '@nestjs/swagger';
import { CreateH07Dto } from './create-h07.dto';

export class UpdateH07Dto extends PartialType(CreateH07Dto) {}
