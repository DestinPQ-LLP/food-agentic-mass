import { PartialType } from '@nestjs/swagger';
import { CreateF07Dto } from './create-f07.dto';

export class UpdateF07Dto extends PartialType(CreateF07Dto) {}
