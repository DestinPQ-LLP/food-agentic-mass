import { PartialType } from '@nestjs/swagger';
import { CreateH04Dto } from './create-h04.dto';

export class UpdateH04Dto extends PartialType(CreateH04Dto) {}
