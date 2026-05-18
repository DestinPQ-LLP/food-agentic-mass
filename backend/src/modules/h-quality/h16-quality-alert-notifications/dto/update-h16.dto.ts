import { PartialType } from '@nestjs/swagger';
import { CreateH16Dto } from './create-h16.dto';

export class UpdateH16Dto extends PartialType(CreateH16Dto) {}
