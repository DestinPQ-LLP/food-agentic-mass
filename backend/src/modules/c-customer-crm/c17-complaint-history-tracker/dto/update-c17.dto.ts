import { PartialType } from '@nestjs/swagger';
import { CreateC17Dto } from './create-c17.dto';

export class UpdateC17Dto extends PartialType(CreateC17Dto) {}
