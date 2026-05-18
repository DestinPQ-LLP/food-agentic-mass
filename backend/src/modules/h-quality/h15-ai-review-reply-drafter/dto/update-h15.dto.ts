import { PartialType } from '@nestjs/swagger';
import { CreateH15Dto } from './create-h15.dto';

export class UpdateH15Dto extends PartialType(CreateH15Dto) {}
