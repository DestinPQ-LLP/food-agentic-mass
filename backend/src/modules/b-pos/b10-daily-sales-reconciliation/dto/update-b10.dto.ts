import { PartialType } from '@nestjs/swagger';
import { CreateB10Dto } from './create-b10.dto';

export class UpdateB10Dto extends PartialType(CreateB10Dto) {}
