import { PartialType } from '@nestjs/swagger';
import { CreateA03Dto } from './create-a03.dto';

export class UpdateA03Dto extends PartialType(CreateA03Dto) {}
