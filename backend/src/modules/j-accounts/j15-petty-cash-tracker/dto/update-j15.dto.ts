import { PartialType } from '@nestjs/swagger';
import { CreateJ15Dto } from './create-j15.dto';

export class UpdateJ15Dto extends PartialType(CreateJ15Dto) {}
