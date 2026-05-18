import { PartialType } from '@nestjs/swagger';
import { CreateA01Dto } from './create-a01.dto';

export class UpdateA01Dto extends PartialType(CreateA01Dto) {}
