import { PartialType } from '@nestjs/swagger';
import { CreateF15Dto } from './create-f15.dto';

export class UpdateF15Dto extends PartialType(CreateF15Dto) {}
