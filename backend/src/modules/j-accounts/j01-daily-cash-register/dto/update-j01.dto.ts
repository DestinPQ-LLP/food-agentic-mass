import { PartialType } from '@nestjs/swagger';
import { CreateJ01Dto } from './create-j01.dto';

export class UpdateJ01Dto extends PartialType(CreateJ01Dto) {}
