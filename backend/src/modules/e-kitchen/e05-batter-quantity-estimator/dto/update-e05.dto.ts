import { PartialType } from '@nestjs/swagger';
import { CreateE05Dto } from './create-e05.dto';

export class UpdateE05Dto extends PartialType(CreateE05Dto) {}
