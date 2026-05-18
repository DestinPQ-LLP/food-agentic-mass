import { PartialType } from '@nestjs/swagger';
import { CreateJ02Dto } from './create-j02.dto';

export class UpdateJ02Dto extends PartialType(CreateJ02Dto) {}
