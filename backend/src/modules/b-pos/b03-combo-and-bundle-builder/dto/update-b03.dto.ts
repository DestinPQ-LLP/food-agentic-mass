import { PartialType } from '@nestjs/swagger';
import { CreateB03Dto } from './create-b03.dto';

export class UpdateB03Dto extends PartialType(CreateB03Dto) {}
