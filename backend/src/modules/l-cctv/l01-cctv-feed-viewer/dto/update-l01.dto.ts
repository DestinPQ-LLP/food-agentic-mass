import { PartialType } from '@nestjs/swagger';
import { CreateL01Dto } from './create-l01.dto';

export class UpdateL01Dto extends PartialType(CreateL01Dto) {}
