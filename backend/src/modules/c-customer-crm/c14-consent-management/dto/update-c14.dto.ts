import { PartialType } from '@nestjs/swagger';
import { CreateC14Dto } from './create-c14.dto';

export class UpdateC14Dto extends PartialType(CreateC14Dto) {}
