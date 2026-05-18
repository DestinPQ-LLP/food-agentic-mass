import { PartialType } from '@nestjs/swagger';
import { CreateC03Dto } from './create-c03.dto';

export class UpdateC03Dto extends PartialType(CreateC03Dto) {}
