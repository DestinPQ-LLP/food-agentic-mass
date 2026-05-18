import { PartialType } from '@nestjs/swagger';
import { CreateD03Dto } from './create-d03.dto';

export class UpdateD03Dto extends PartialType(CreateD03Dto) {}
