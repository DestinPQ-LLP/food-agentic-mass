import { PartialType } from '@nestjs/swagger';
import { CreateG10Dto } from './create-g10.dto';

export class UpdateG10Dto extends PartialType(CreateG10Dto) {}
