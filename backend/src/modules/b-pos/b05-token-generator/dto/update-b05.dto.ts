import { PartialType } from '@nestjs/swagger';
import { CreateB05Dto } from './create-b05.dto';

export class UpdateB05Dto extends PartialType(CreateB05Dto) {}
