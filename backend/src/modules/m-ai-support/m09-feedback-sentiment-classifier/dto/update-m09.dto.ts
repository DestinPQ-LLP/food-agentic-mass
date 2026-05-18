import { PartialType } from '@nestjs/swagger';
import { CreateM09Dto } from './create-m09.dto';

export class UpdateM09Dto extends PartialType(CreateM09Dto) {}
