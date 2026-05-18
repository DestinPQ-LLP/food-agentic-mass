import { PartialType } from '@nestjs/swagger';
import { CreateE14Dto } from './create-e14.dto';

export class UpdateE14Dto extends PartialType(CreateE14Dto) {}
