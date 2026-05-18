import { PartialType } from '@nestjs/swagger';
import { CreateC16Dto } from './create-c16.dto';

export class UpdateC16Dto extends PartialType(CreateC16Dto) {}
