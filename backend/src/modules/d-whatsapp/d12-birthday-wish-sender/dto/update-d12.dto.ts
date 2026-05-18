import { PartialType } from '@nestjs/swagger';
import { CreateD12Dto } from './create-d12.dto';

export class UpdateD12Dto extends PartialType(CreateD12Dto) {}
