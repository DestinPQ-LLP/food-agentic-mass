import { PartialType } from '@nestjs/swagger';
import { CreateG16Dto } from './create-g16.dto';

export class UpdateG16Dto extends PartialType(CreateG16Dto) {}
