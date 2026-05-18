import { PartialType } from '@nestjs/swagger';
import { CreateB08Dto } from './create-b08.dto';

export class UpdateB08Dto extends PartialType(CreateB08Dto) {}
