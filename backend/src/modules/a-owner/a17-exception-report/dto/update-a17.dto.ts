import { PartialType } from '@nestjs/swagger';
import { CreateA17Dto } from './create-a17.dto';

export class UpdateA17Dto extends PartialType(CreateA17Dto) {}
