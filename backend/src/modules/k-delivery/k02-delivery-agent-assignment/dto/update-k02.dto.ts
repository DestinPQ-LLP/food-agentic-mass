import { PartialType } from '@nestjs/swagger';
import { CreateK02Dto } from './create-k02.dto';

export class UpdateK02Dto extends PartialType(CreateK02Dto) {}
