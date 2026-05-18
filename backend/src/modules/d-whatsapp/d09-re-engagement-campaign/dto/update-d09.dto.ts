import { PartialType } from '@nestjs/swagger';
import { CreateD09Dto } from './create-d09.dto';

export class UpdateD09Dto extends PartialType(CreateD09Dto) {}
