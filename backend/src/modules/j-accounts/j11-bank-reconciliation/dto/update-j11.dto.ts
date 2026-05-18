import { PartialType } from '@nestjs/swagger';
import { CreateJ11Dto } from './create-j11.dto';

export class UpdateJ11Dto extends PartialType(CreateJ11Dto) {}
