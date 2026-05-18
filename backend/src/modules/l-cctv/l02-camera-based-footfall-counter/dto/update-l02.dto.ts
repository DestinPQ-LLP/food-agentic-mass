import { PartialType } from '@nestjs/swagger';
import { CreateL02Dto } from './create-l02.dto';

export class UpdateL02Dto extends PartialType(CreateL02Dto) {}
