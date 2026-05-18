import { PartialType } from '@nestjs/swagger';
import { CreateN04Dto } from './create-n04.dto';

export class UpdateN04Dto extends PartialType(CreateN04Dto) {}
