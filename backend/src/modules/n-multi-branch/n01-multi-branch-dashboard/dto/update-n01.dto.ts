import { PartialType } from '@nestjs/swagger';
import { CreateN01Dto } from './create-n01.dto';

export class UpdateN01Dto extends PartialType(CreateN01Dto) {}
