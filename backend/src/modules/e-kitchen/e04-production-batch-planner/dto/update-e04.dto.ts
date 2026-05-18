import { PartialType } from '@nestjs/swagger';
import { CreateE04Dto } from './create-e04.dto';

export class UpdateE04Dto extends PartialType(CreateE04Dto) {}
