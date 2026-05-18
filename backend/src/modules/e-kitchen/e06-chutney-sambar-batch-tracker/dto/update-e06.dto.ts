import { PartialType } from '@nestjs/swagger';
import { CreateE06Dto } from './create-e06.dto';

export class UpdateE06Dto extends PartialType(CreateE06Dto) {}
