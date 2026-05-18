import { PartialType } from '@nestjs/swagger';
import { CreateH11Dto } from './create-h11.dto';

export class UpdateH11Dto extends PartialType(CreateH11Dto) {}
