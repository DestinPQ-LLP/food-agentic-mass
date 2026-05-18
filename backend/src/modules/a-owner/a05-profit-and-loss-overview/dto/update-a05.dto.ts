import { PartialType } from '@nestjs/swagger';
import { CreateA05Dto } from './create-a05.dto';

export class UpdateA05Dto extends PartialType(CreateA05Dto) {}
