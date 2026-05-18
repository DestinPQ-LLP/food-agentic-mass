import { PartialType } from '@nestjs/swagger';
import { CreateH06Dto } from './create-h06.dto';

export class UpdateH06Dto extends PartialType(CreateH06Dto) {}
