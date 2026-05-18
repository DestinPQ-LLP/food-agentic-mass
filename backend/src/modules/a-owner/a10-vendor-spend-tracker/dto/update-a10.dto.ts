import { PartialType } from '@nestjs/swagger';
import { CreateA10Dto } from './create-a10.dto';

export class UpdateA10Dto extends PartialType(CreateA10Dto) {}
