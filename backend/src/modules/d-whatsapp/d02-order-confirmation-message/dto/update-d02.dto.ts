import { PartialType } from '@nestjs/swagger';
import { CreateD02Dto } from './create-d02.dto';

export class UpdateD02Dto extends PartialType(CreateD02Dto) {}
