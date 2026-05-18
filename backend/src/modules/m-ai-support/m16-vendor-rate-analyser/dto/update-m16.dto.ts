import { PartialType } from '@nestjs/swagger';
import { CreateM16Dto } from './create-m16.dto';

export class UpdateM16Dto extends PartialType(CreateM16Dto) {}
