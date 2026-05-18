import { PartialType } from '@nestjs/swagger';
import { CreateA16Dto } from './create-a16.dto';

export class UpdateA16Dto extends PartialType(CreateA16Dto) {}
