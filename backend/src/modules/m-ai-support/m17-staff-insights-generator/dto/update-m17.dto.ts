import { PartialType } from '@nestjs/swagger';
import { CreateM17Dto } from './create-m17.dto';

export class UpdateM17Dto extends PartialType(CreateM17Dto) {}
