import { PartialType } from '@nestjs/swagger';
import { CreateC12Dto } from './create-c12.dto';

export class UpdateC12Dto extends PartialType(CreateC12Dto) {}
