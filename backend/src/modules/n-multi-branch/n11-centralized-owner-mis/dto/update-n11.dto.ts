import { PartialType } from '@nestjs/swagger';
import { CreateN11Dto } from './create-n11.dto';

export class UpdateN11Dto extends PartialType(CreateN11Dto) {}
