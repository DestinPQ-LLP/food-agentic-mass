import { PartialType } from '@nestjs/swagger';
import { CreateB15Dto } from './create-b15.dto';

export class UpdateB15Dto extends PartialType(CreateB15Dto) {}
