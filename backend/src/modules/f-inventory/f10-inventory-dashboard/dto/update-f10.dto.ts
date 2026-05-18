import { PartialType } from '@nestjs/swagger';
import { CreateF10Dto } from './create-f10.dto';

export class UpdateF10Dto extends PartialType(CreateF10Dto) {}
