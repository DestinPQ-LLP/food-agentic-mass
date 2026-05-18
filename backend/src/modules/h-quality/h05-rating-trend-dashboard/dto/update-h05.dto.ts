import { PartialType } from '@nestjs/swagger';
import { CreateH05Dto } from './create-h05.dto';

export class UpdateH05Dto extends PartialType(CreateH05Dto) {}
