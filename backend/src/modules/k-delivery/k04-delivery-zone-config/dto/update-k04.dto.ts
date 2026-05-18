import { PartialType } from '@nestjs/swagger';
import { CreateK04Dto } from './create-k04.dto';

export class UpdateK04Dto extends PartialType(CreateK04Dto) {}
