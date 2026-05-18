import { PartialType } from '@nestjs/swagger';
import { CreateF14Dto } from './create-f14.dto';

export class UpdateF14Dto extends PartialType(CreateF14Dto) {}
