import { PartialType } from '@nestjs/swagger';
import { CreateF02Dto } from './create-f02.dto';

export class UpdateF02Dto extends PartialType(CreateF02Dto) {}
