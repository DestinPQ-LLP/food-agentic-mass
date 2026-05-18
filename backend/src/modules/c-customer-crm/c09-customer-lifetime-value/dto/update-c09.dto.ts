import { PartialType } from '@nestjs/swagger';
import { CreateC09Dto } from './create-c09.dto';

export class UpdateC09Dto extends PartialType(CreateC09Dto) {}
