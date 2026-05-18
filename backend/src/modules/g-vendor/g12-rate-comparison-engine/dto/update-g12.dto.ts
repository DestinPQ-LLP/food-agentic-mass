import { PartialType } from '@nestjs/swagger';
import { CreateG12Dto } from './create-g12.dto';

export class UpdateG12Dto extends PartialType(CreateG12Dto) {}
