import { PartialType } from '@nestjs/swagger';
import { CreateN18Dto } from './create-n18.dto';

export class UpdateN18Dto extends PartialType(CreateN18Dto) {}
