import { PartialType } from '@nestjs/swagger';
import { CreateM02Dto } from './create-m02.dto';

export class UpdateM02Dto extends PartialType(CreateM02Dto) {}
