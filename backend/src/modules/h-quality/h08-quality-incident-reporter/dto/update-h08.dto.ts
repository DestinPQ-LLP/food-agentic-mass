import { PartialType } from '@nestjs/swagger';
import { CreateH08Dto } from './create-h08.dto';

export class UpdateH08Dto extends PartialType(CreateH08Dto) {}
