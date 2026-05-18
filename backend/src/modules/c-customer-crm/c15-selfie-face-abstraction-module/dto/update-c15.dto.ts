import { PartialType } from '@nestjs/swagger';
import { CreateC15Dto } from './create-c15.dto';

export class UpdateC15Dto extends PartialType(CreateC15Dto) {}
