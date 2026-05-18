import { PartialType } from '@nestjs/swagger';
import { CreateF17Dto } from './create-f17.dto';

export class UpdateF17Dto extends PartialType(CreateF17Dto) {}
