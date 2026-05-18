import { PartialType } from '@nestjs/swagger';
import { CreateF12Dto } from './create-f12.dto';

export class UpdateF12Dto extends PartialType(CreateF12Dto) {}
