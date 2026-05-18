import { PartialType } from '@nestjs/swagger';
import { CreateE10Dto } from './create-e10.dto';

export class UpdateE10Dto extends PartialType(CreateE10Dto) {}
