import { PartialType } from '@nestjs/swagger';
import { CreateG15Dto } from './create-g15.dto';

export class UpdateG15Dto extends PartialType(CreateG15Dto) {}
