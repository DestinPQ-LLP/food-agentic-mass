import { PartialType } from '@nestjs/swagger';
import { CreateL14Dto } from './create-l14.dto';

export class UpdateL14Dto extends PartialType(CreateL14Dto) {}
