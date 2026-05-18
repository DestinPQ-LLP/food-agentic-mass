import { PartialType } from '@nestjs/swagger';
import { CreateE13Dto } from './create-e13.dto';

export class UpdateE13Dto extends PartialType(CreateE13Dto) {}
