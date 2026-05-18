import { PartialType } from '@nestjs/swagger';
import { CreateG09Dto } from './create-g09.dto';

export class UpdateG09Dto extends PartialType(CreateG09Dto) {}
