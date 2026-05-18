import { PartialType } from '@nestjs/swagger';
import { CreateB07Dto } from './create-b07.dto';

export class UpdateB07Dto extends PartialType(CreateB07Dto) {}
