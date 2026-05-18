import { PartialType } from '@nestjs/swagger';
import { CreateF11Dto } from './create-f11.dto';

export class UpdateF11Dto extends PartialType(CreateF11Dto) {}
