import { PartialType } from '@nestjs/swagger';
import { CreateG01Dto } from './create-g01.dto';

export class UpdateG01Dto extends PartialType(CreateG01Dto) {}
