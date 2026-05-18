import { PartialType } from '@nestjs/swagger';
import { CreateD10Dto } from './create-d10.dto';

export class UpdateD10Dto extends PartialType(CreateD10Dto) {}
