import { PartialType } from '@nestjs/swagger';
import { CreateM14Dto } from './create-m14.dto';

export class UpdateM14Dto extends PartialType(CreateM14Dto) {}
