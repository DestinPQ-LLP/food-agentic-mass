import { PartialType } from '@nestjs/swagger';
import { CreateE09Dto } from './create-e09.dto';

export class UpdateE09Dto extends PartialType(CreateE09Dto) {}
