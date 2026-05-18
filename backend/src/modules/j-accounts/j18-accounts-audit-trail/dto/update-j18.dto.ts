import { PartialType } from '@nestjs/swagger';
import { CreateJ18Dto } from './create-j18.dto';

export class UpdateJ18Dto extends PartialType(CreateJ18Dto) {}
