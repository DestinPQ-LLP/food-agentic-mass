import { PartialType } from '@nestjs/swagger';
import { CreateG04Dto } from './create-g04.dto';

export class UpdateG04Dto extends PartialType(CreateG04Dto) {}
