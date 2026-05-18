import { PartialType } from '@nestjs/swagger';
import { CreateK15Dto } from './create-k15.dto';

export class UpdateK15Dto extends PartialType(CreateK15Dto) {}
