import { PartialType } from '@nestjs/swagger';
import { CreateB04Dto } from './create-b04.dto';

export class UpdateB04Dto extends PartialType(CreateB04Dto) {}
