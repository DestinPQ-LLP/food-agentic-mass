import { PartialType } from '@nestjs/swagger';
import { CreateL17Dto } from './create-l17.dto';

export class UpdateL17Dto extends PartialType(CreateL17Dto) {}
