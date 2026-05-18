import { PartialType } from '@nestjs/swagger';
import { CreateM04Dto } from './create-m04.dto';

export class UpdateM04Dto extends PartialType(CreateM04Dto) {}
