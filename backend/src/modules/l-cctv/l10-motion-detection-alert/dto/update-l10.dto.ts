import { PartialType } from '@nestjs/swagger';
import { CreateL10Dto } from './create-l10.dto';

export class UpdateL10Dto extends PartialType(CreateL10Dto) {}
