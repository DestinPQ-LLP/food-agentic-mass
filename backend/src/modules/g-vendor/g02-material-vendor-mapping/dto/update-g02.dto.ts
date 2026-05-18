import { PartialType } from '@nestjs/swagger';
import { CreateG02Dto } from './create-g02.dto';

export class UpdateG02Dto extends PartialType(CreateG02Dto) {}
