import { PartialType } from '@nestjs/swagger';
import { CreateL08Dto } from './create-l08.dto';

export class UpdateL08Dto extends PartialType(CreateL08Dto) {}
