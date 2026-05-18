import { PartialType } from '@nestjs/swagger';
import { CreateC08Dto } from './create-c08.dto';

export class UpdateC08Dto extends PartialType(CreateC08Dto) {}
