import { PartialType } from '@nestjs/swagger';
import { CreateC11Dto } from './create-c11.dto';

export class UpdateC11Dto extends PartialType(CreateC11Dto) {}
