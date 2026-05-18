import { PartialType } from '@nestjs/swagger';
import { CreateN09Dto } from './create-n09.dto';

export class UpdateN09Dto extends PartialType(CreateN09Dto) {}
