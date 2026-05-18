import { PartialType } from '@nestjs/swagger';
import { CreateC02Dto } from './create-c02.dto';

export class UpdateC02Dto extends PartialType(CreateC02Dto) {}
