import { PartialType } from '@nestjs/swagger';
import { CreateF06Dto } from './create-f06.dto';

export class UpdateF06Dto extends PartialType(CreateF06Dto) {}
