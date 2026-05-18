import { PartialType } from '@nestjs/swagger';
import { CreateN14Dto } from './create-n14.dto';

export class UpdateN14Dto extends PartialType(CreateN14Dto) {}
