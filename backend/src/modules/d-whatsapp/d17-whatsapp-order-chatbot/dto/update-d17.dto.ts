import { PartialType } from '@nestjs/swagger';
import { CreateD17Dto } from './create-d17.dto';

export class UpdateD17Dto extends PartialType(CreateD17Dto) {}
