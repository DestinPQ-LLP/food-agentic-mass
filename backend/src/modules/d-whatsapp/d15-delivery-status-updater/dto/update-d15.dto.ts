import { PartialType } from '@nestjs/swagger';
import { CreateD15Dto } from './create-d15.dto';

export class UpdateD15Dto extends PartialType(CreateD15Dto) {}
