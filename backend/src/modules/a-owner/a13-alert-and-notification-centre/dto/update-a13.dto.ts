import { PartialType } from '@nestjs/swagger';
import { CreateA13Dto } from './create-a13.dto';

export class UpdateA13Dto extends PartialType(CreateA13Dto) {}
