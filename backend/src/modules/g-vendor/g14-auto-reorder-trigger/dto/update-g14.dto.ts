import { PartialType } from '@nestjs/swagger';
import { CreateG14Dto } from './create-g14.dto';

export class UpdateG14Dto extends PartialType(CreateG14Dto) {}
