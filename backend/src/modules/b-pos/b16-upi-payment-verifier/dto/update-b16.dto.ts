import { PartialType } from '@nestjs/swagger';
import { CreateB16Dto } from './create-b16.dto';

export class UpdateB16Dto extends PartialType(CreateB16Dto) {}
