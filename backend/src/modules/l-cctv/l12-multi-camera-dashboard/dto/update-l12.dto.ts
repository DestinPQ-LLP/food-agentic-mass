import { PartialType } from '@nestjs/swagger';
import { CreateL12Dto } from './create-l12.dto';

export class UpdateL12Dto extends PartialType(CreateL12Dto) {}
