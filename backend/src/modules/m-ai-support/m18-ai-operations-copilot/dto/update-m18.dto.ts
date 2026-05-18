import { PartialType } from '@nestjs/swagger';
import { CreateM18Dto } from './create-m18.dto';

export class UpdateM18Dto extends PartialType(CreateM18Dto) {}
