import { PartialType } from '@nestjs/swagger';
import { CreateE12Dto } from './create-e12.dto';

export class UpdateE12Dto extends PartialType(CreateE12Dto) {}
