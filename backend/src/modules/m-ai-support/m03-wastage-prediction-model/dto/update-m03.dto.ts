import { PartialType } from '@nestjs/swagger';
import { CreateM03Dto } from './create-m03.dto';

export class UpdateM03Dto extends PartialType(CreateM03Dto) {}
