import { PartialType } from '@nestjs/swagger';
import { CreateA15Dto } from './create-a15.dto';

export class UpdateA15Dto extends PartialType(CreateA15Dto) {}
