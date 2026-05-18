import { PartialType } from '@nestjs/swagger';
import { CreateI08Dto } from './create-i08.dto';

export class UpdateI08Dto extends PartialType(CreateI08Dto) {}
