import { PartialType } from '@nestjs/swagger';
import { CreateF03Dto } from './create-f03.dto';

export class UpdateF03Dto extends PartialType(CreateF03Dto) {}
