import { PartialType } from '@nestjs/swagger';
import { CreateN17Dto } from './create-n17.dto';

export class UpdateN17Dto extends PartialType(CreateN17Dto) {}
