import { PartialType } from '@nestjs/swagger';
import { CreateE01Dto } from './create-e01.dto';

export class UpdateE01Dto extends PartialType(CreateE01Dto) {}
