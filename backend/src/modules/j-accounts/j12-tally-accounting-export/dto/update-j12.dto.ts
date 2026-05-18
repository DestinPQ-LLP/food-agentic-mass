import { PartialType } from '@nestjs/swagger';
import { CreateJ12Dto } from './create-j12.dto';

export class UpdateJ12Dto extends PartialType(CreateJ12Dto) {}
