import { PartialType } from '@nestjs/swagger';
import { CreateC10Dto } from './create-c10.dto';

export class UpdateC10Dto extends PartialType(CreateC10Dto) {}
