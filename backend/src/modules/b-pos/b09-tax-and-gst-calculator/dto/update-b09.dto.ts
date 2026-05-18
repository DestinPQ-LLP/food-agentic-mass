import { PartialType } from '@nestjs/swagger';
import { CreateB09Dto } from './create-b09.dto';

export class UpdateB09Dto extends PartialType(CreateB09Dto) {}
