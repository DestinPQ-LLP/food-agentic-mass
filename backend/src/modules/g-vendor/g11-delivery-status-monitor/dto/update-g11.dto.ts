import { PartialType } from '@nestjs/swagger';
import { CreateG11Dto } from './create-g11.dto';

export class UpdateG11Dto extends PartialType(CreateG11Dto) {}
