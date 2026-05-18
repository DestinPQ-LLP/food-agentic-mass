import { PartialType } from '@nestjs/swagger';
import { CreateD08Dto } from './create-d08.dto';

export class UpdateD08Dto extends PartialType(CreateD08Dto) {}
