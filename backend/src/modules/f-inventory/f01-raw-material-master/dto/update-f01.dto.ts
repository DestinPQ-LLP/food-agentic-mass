import { PartialType } from '@nestjs/swagger';
import { CreateF01Dto } from './create-f01.dto';

export class UpdateF01Dto extends PartialType(CreateF01Dto) {}
