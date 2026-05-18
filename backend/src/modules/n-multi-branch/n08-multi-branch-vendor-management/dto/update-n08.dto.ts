import { PartialType } from '@nestjs/swagger';
import { CreateN08Dto } from './create-n08.dto';

export class UpdateN08Dto extends PartialType(CreateN08Dto) {}
