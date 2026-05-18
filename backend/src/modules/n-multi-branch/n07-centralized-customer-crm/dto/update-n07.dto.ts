import { PartialType } from '@nestjs/swagger';
import { CreateN07Dto } from './create-n07.dto';

export class UpdateN07Dto extends PartialType(CreateN07Dto) {}
