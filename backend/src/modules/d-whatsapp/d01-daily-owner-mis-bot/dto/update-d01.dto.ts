import { PartialType } from '@nestjs/swagger';
import { CreateD01Dto } from './create-d01.dto';

export class UpdateD01Dto extends PartialType(CreateD01Dto) {}
