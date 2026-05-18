import { PartialType } from '@nestjs/swagger';
import { CreateD18Dto } from './create-d18.dto';

export class UpdateD18Dto extends PartialType(CreateD18Dto) {}
