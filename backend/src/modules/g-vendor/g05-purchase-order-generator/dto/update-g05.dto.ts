import { PartialType } from '@nestjs/swagger';
import { CreateG05Dto } from './create-g05.dto';

export class UpdateG05Dto extends PartialType(CreateG05Dto) {}
