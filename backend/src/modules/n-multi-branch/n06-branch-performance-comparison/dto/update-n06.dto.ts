import { PartialType } from '@nestjs/swagger';
import { CreateN06Dto } from './create-n06.dto';

export class UpdateN06Dto extends PartialType(CreateN06Dto) {}
