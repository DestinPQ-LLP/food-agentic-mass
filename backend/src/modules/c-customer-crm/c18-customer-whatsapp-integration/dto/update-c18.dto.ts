import { PartialType } from '@nestjs/swagger';
import { CreateC18Dto } from './create-c18.dto';

export class UpdateC18Dto extends PartialType(CreateC18Dto) {}
