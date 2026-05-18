import { PartialType } from '@nestjs/swagger';
import { CreateL18Dto } from './create-l18.dto';

export class UpdateL18Dto extends PartialType(CreateL18Dto) {}
