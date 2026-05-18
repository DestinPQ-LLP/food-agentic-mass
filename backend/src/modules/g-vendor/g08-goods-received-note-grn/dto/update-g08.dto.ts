import { PartialType } from '@nestjs/swagger';
import { CreateG08Dto } from './create-g08.dto';

export class UpdateG08Dto extends PartialType(CreateG08Dto) {}
