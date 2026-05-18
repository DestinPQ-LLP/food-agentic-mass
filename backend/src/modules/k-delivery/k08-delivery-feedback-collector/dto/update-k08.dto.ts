import { PartialType } from '@nestjs/swagger';
import { CreateK08Dto } from './create-k08.dto';

export class UpdateK08Dto extends PartialType(CreateK08Dto) {}
