import { PartialType } from '@nestjs/swagger';
import { CreateB18Dto } from './create-b18.dto';

export class UpdateB18Dto extends PartialType(CreateB18Dto) {}
