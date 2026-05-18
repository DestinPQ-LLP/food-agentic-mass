import { PartialType } from '@nestjs/swagger';
import { CreateG13Dto } from './create-g13.dto';

export class UpdateG13Dto extends PartialType(CreateG13Dto) {}
