import { PartialType } from '@nestjs/swagger';
import { CreateE02Dto } from './create-e02.dto';

export class UpdateE02Dto extends PartialType(CreateE02Dto) {}
