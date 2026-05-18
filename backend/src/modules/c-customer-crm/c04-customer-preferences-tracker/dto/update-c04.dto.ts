import { PartialType } from '@nestjs/swagger';
import { CreateC04Dto } from './create-c04.dto';

export class UpdateC04Dto extends PartialType(CreateC04Dto) {}
