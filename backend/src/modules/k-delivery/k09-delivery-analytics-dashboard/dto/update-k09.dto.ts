import { PartialType } from '@nestjs/swagger';
import { CreateK09Dto } from './create-k09.dto';

export class UpdateK09Dto extends PartialType(CreateK09Dto) {}
