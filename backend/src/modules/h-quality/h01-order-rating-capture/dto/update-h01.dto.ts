import { PartialType } from '@nestjs/swagger';
import { CreateH01Dto } from './create-h01.dto';

export class UpdateH01Dto extends PartialType(CreateH01Dto) {}
