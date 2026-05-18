import { PartialType } from '@nestjs/swagger';
import { CreateN12Dto } from './create-n12.dto';

export class UpdateN12Dto extends PartialType(CreateN12Dto) {}
