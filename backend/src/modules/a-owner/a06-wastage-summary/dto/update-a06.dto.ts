import { PartialType } from '@nestjs/swagger';
import { CreateA06Dto } from './create-a06.dto';

export class UpdateA06Dto extends PartialType(CreateA06Dto) {}
