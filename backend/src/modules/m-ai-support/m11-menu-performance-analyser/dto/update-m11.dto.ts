import { PartialType } from '@nestjs/swagger';
import { CreateM11Dto } from './create-m11.dto';

export class UpdateM11Dto extends PartialType(CreateM11Dto) {}
