import { PartialType } from '@nestjs/swagger';
import { CreateH02Dto } from './create-h02.dto';

export class UpdateH02Dto extends PartialType(CreateH02Dto) {}
