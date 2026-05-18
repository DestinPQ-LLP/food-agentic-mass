import { PartialType } from '@nestjs/swagger';
import { CreateC07Dto } from './create-c07.dto';

export class UpdateC07Dto extends PartialType(CreateC07Dto) {}
