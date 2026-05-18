import { PartialType } from '@nestjs/swagger';
import { CreateG18Dto } from './create-g18.dto';

export class UpdateG18Dto extends PartialType(CreateG18Dto) {}
