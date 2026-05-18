import { PartialType } from '@nestjs/swagger';
import { CreateG03Dto } from './create-g03.dto';

export class UpdateG03Dto extends PartialType(CreateG03Dto) {}
