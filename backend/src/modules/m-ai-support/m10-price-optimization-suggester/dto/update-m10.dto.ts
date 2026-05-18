import { PartialType } from '@nestjs/swagger';
import { CreateM10Dto } from './create-m10.dto';

export class UpdateM10Dto extends PartialType(CreateM10Dto) {}
