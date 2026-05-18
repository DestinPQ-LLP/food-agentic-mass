import { PartialType } from '@nestjs/swagger';
import { CreateI03Dto } from './create-i03.dto';

export class UpdateI03Dto extends PartialType(CreateI03Dto) {}
