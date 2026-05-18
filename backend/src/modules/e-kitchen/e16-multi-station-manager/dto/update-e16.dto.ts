import { PartialType } from '@nestjs/swagger';
import { CreateE16Dto } from './create-e16.dto';

export class UpdateE16Dto extends PartialType(CreateE16Dto) {}
