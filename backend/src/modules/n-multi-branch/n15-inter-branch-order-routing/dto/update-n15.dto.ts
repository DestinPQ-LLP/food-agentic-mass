import { PartialType } from '@nestjs/swagger';
import { CreateN15Dto } from './create-n15.dto';

export class UpdateN15Dto extends PartialType(CreateN15Dto) {}
