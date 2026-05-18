import { PartialType } from '@nestjs/swagger';
import { CreateE07Dto } from './create-e07.dto';

export class UpdateE07Dto extends PartialType(CreateE07Dto) {}
