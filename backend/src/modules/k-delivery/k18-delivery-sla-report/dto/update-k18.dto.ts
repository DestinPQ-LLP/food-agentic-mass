import { PartialType } from '@nestjs/swagger';
import { CreateK18Dto } from './create-k18.dto';

export class UpdateK18Dto extends PartialType(CreateK18Dto) {}
