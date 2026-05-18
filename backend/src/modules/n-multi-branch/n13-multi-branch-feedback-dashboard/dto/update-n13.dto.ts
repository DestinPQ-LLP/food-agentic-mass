import { PartialType } from '@nestjs/swagger';
import { CreateN13Dto } from './create-n13.dto';

export class UpdateN13Dto extends PartialType(CreateN13Dto) {}
