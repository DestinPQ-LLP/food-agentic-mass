import { PartialType } from '@nestjs/swagger';
import { CreateE18Dto } from './create-e18.dto';

export class UpdateE18Dto extends PartialType(CreateE18Dto) {}
