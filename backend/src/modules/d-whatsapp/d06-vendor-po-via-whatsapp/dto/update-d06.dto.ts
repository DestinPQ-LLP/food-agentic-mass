import { PartialType } from '@nestjs/swagger';
import { CreateD06Dto } from './create-d06.dto';

export class UpdateD06Dto extends PartialType(CreateD06Dto) {}
