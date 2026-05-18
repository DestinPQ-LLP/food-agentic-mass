import { PartialType } from '@nestjs/swagger';
import { CreateK12Dto } from './create-k12.dto';

export class UpdateK12Dto extends PartialType(CreateK12Dto) {}
