import { PartialType } from '@nestjs/swagger';
import { CreateC13Dto } from './create-c13.dto';

export class UpdateC13Dto extends PartialType(CreateC13Dto) {}
