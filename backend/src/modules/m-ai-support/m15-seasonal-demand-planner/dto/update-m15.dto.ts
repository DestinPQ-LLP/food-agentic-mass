import { PartialType } from '@nestjs/swagger';
import { CreateM15Dto } from './create-m15.dto';

export class UpdateM15Dto extends PartialType(CreateM15Dto) {}
