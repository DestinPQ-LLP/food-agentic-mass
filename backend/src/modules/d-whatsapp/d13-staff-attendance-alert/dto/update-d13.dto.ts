import { PartialType } from '@nestjs/swagger';
import { CreateD13Dto } from './create-d13.dto';

export class UpdateD13Dto extends PartialType(CreateD13Dto) {}
