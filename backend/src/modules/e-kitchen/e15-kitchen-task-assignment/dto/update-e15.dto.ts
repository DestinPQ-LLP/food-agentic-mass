import { PartialType } from '@nestjs/swagger';
import { CreateE15Dto } from './create-e15.dto';

export class UpdateE15Dto extends PartialType(CreateE15Dto) {}
