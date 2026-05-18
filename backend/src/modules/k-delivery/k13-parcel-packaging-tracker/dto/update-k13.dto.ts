import { PartialType } from '@nestjs/swagger';
import { CreateK13Dto } from './create-k13.dto';

export class UpdateK13Dto extends PartialType(CreateK13Dto) {}
