import { PartialType } from '@nestjs/swagger';
import { CreateG17Dto } from './create-g17.dto';

export class UpdateG17Dto extends PartialType(CreateG17Dto) {}
