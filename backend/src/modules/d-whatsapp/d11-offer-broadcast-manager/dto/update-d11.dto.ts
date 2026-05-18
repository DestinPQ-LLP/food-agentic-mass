import { PartialType } from '@nestjs/swagger';
import { CreateD11Dto } from './create-d11.dto';

export class UpdateD11Dto extends PartialType(CreateD11Dto) {}
