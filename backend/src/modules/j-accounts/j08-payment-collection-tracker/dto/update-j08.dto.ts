import { PartialType } from '@nestjs/swagger';
import { CreateJ08Dto } from './create-j08.dto';

export class UpdateJ08Dto extends PartialType(CreateJ08Dto) {}
