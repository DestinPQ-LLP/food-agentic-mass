import { PartialType } from '@nestjs/swagger';
import { CreateE17Dto } from './create-e17.dto';

export class UpdateE17Dto extends PartialType(CreateE17Dto) {}
