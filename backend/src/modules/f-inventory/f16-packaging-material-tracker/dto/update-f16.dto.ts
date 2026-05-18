import { PartialType } from '@nestjs/swagger';
import { CreateF16Dto } from './create-f16.dto';

export class UpdateF16Dto extends PartialType(CreateF16Dto) {}
