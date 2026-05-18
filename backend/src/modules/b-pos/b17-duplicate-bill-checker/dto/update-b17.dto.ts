import { PartialType } from '@nestjs/swagger';
import { CreateB17Dto } from './create-b17.dto';

export class UpdateB17Dto extends PartialType(CreateB17Dto) {}
