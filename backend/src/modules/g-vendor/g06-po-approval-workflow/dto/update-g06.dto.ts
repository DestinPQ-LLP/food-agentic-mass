import { PartialType } from '@nestjs/swagger';
import { CreateG06Dto } from './create-g06.dto';

export class UpdateG06Dto extends PartialType(CreateG06Dto) {}
