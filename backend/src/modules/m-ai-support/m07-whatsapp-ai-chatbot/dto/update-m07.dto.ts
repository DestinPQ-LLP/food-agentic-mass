import { PartialType } from '@nestjs/swagger';
import { CreateM07Dto } from './create-m07.dto';

export class UpdateM07Dto extends PartialType(CreateM07Dto) {}
