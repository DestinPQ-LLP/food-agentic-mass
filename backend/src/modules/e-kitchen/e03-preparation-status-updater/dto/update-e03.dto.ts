import { PartialType } from '@nestjs/swagger';
import { CreateE03Dto } from './create-e03.dto';

export class UpdateE03Dto extends PartialType(CreateE03Dto) {}
