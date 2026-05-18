import { PartialType } from '@nestjs/swagger';
import { CreateA18Dto } from './create-a18.dto';

export class UpdateA18Dto extends PartialType(CreateA18Dto) {}
