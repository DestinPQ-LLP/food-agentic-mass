import { PartialType } from '@nestjs/swagger';
import { CreateH12Dto } from './create-h12.dto';

export class UpdateH12Dto extends PartialType(CreateH12Dto) {}
