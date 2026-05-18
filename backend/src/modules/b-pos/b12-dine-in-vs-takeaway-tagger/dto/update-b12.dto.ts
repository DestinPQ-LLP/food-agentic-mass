import { PartialType } from '@nestjs/swagger';
import { CreateB12Dto } from './create-b12.dto';

export class UpdateB12Dto extends PartialType(CreateB12Dto) {}
