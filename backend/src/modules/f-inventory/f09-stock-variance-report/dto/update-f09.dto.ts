import { PartialType } from '@nestjs/swagger';
import { CreateF09Dto } from './create-f09.dto';

export class UpdateF09Dto extends PartialType(CreateF09Dto) {}
