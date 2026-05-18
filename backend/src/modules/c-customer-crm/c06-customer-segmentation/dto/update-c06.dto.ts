import { PartialType } from '@nestjs/swagger';
import { CreateC06Dto } from './create-c06.dto';

export class UpdateC06Dto extends PartialType(CreateC06Dto) {}
