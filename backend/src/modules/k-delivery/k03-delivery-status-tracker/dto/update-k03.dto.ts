import { PartialType } from '@nestjs/swagger';
import { CreateK03Dto } from './create-k03.dto';

export class UpdateK03Dto extends PartialType(CreateK03Dto) {}
