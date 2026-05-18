import { PartialType } from '@nestjs/swagger';
import { CreateE11Dto } from './create-e11.dto';

export class UpdateE11Dto extends PartialType(CreateE11Dto) {}
