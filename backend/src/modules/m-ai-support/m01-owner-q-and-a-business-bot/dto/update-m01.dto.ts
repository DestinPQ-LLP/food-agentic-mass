import { PartialType } from '@nestjs/swagger';
import { CreateM01Dto } from './create-m01.dto';

export class UpdateM01Dto extends PartialType(CreateM01Dto) {}
