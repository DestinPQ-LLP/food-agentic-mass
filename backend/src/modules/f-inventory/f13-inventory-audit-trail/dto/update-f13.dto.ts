import { PartialType } from '@nestjs/swagger';
import { CreateF13Dto } from './create-f13.dto';

export class UpdateF13Dto extends PartialType(CreateF13Dto) {}
