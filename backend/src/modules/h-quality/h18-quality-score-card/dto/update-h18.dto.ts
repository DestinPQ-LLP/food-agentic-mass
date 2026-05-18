import { PartialType } from '@nestjs/swagger';
import { CreateH18Dto } from './create-h18.dto';

export class UpdateH18Dto extends PartialType(CreateH18Dto) {}
