import { PartialType } from '@nestjs/swagger';
import { CreateN16Dto } from './create-n16.dto';

export class UpdateN16Dto extends PartialType(CreateN16Dto) {}
