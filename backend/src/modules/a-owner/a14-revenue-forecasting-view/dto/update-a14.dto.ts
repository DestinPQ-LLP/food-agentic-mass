import { PartialType } from '@nestjs/swagger';
import { CreateA14Dto } from './create-a14.dto';

export class UpdateA14Dto extends PartialType(CreateA14Dto) {}
