import { PartialType } from '@nestjs/swagger';
import { CreateM05Dto } from './create-m05.dto';

export class UpdateM05Dto extends PartialType(CreateM05Dto) {}
