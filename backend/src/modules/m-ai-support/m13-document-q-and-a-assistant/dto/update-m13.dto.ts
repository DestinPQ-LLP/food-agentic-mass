import { PartialType } from '@nestjs/swagger';
import { CreateM13Dto } from './create-m13.dto';

export class UpdateM13Dto extends PartialType(CreateM13Dto) {}
