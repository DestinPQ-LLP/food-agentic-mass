import { PartialType } from '@nestjs/swagger';
import { CreateB06Dto } from './create-b06.dto';

export class UpdateB06Dto extends PartialType(CreateB06Dto) {}
