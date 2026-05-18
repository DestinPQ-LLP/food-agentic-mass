import { PartialType } from '@nestjs/swagger';
import { CreateJ03Dto } from './create-j03.dto';

export class UpdateJ03Dto extends PartialType(CreateJ03Dto) {}
