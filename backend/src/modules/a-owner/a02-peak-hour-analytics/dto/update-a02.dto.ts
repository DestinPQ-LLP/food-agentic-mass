import { PartialType } from '@nestjs/swagger';
import { CreateA02Dto } from './create-a02.dto';

export class UpdateA02Dto extends PartialType(CreateA02Dto) {}
