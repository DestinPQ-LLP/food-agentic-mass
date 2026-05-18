import { PartialType } from '@nestjs/swagger';
import { CreateE08Dto } from './create-e08.dto';

export class UpdateE08Dto extends PartialType(CreateE08Dto) {}
