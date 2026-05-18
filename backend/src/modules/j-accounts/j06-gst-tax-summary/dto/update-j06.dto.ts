import { PartialType } from '@nestjs/swagger';
import { CreateJ06Dto } from './create-j06.dto';

export class UpdateJ06Dto extends PartialType(CreateJ06Dto) {}
