import { PartialType } from '@nestjs/swagger';
import { CreateK01Dto } from './create-k01.dto';

export class UpdateK01Dto extends PartialType(CreateK01Dto) {}
