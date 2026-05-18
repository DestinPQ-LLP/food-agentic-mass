import { PartialType } from '@nestjs/swagger';
import { CreateM06Dto } from './create-m06.dto';

export class UpdateM06Dto extends PartialType(CreateM06Dto) {}
