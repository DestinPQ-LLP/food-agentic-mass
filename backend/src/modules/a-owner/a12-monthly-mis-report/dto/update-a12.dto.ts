import { PartialType } from '@nestjs/swagger';
import { CreateA12Dto } from './create-a12.dto';

export class UpdateA12Dto extends PartialType(CreateA12Dto) {}
