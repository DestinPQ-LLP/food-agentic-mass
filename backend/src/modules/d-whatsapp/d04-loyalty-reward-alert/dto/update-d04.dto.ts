import { PartialType } from '@nestjs/swagger';
import { CreateD04Dto } from './create-d04.dto';

export class UpdateD04Dto extends PartialType(CreateD04Dto) {}
