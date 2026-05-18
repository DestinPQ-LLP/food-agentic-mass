import { PartialType } from '@nestjs/swagger';
import { CreateM12Dto } from './create-m12.dto';

export class UpdateM12Dto extends PartialType(CreateM12Dto) {}
