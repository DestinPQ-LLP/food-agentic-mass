import { PartialType } from '@nestjs/swagger';
import { CreateK11Dto } from './create-k11.dto';

export class UpdateK11Dto extends PartialType(CreateK11Dto) {}
