import { PartialType } from '@nestjs/swagger';
import { CreateM08Dto } from './create-m08.dto';

export class UpdateM08Dto extends PartialType(CreateM08Dto) {}
