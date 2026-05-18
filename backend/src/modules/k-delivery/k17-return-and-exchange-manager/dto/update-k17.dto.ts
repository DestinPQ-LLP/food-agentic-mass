import { PartialType } from '@nestjs/swagger';
import { CreateK17Dto } from './create-k17.dto';

export class UpdateK17Dto extends PartialType(CreateK17Dto) {}
