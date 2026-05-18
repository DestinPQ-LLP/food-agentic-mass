import { PartialType } from '@nestjs/swagger';
import { CreateN03Dto } from './create-n03.dto';

export class UpdateN03Dto extends PartialType(CreateN03Dto) {}
