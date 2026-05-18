import { PartialType } from '@nestjs/swagger';
import { CreateD16Dto } from './create-d16.dto';

export class UpdateD16Dto extends PartialType(CreateD16Dto) {}
