import { PartialType } from '@nestjs/swagger';
import { CreateF18Dto } from './create-f18.dto';

export class UpdateF18Dto extends PartialType(CreateF18Dto) {}
