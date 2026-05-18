import { PartialType } from '@nestjs/swagger';
import { CreateH10Dto } from './create-h10.dto';

export class UpdateH10Dto extends PartialType(CreateH10Dto) {}
