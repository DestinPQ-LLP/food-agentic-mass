import { PartialType } from '@nestjs/swagger';
import { CreateG07Dto } from './create-g07.dto';

export class UpdateG07Dto extends PartialType(CreateG07Dto) {}
