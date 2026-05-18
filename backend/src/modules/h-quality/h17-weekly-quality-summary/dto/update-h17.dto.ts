import { PartialType } from '@nestjs/swagger';
import { CreateH17Dto } from './create-h17.dto';

export class UpdateH17Dto extends PartialType(CreateH17Dto) {}
