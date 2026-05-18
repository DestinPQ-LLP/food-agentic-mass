import { PartialType } from '@nestjs/swagger';
import { CreateA04Dto } from './create-a04.dto';

export class UpdateA04Dto extends PartialType(CreateA04Dto) {}
