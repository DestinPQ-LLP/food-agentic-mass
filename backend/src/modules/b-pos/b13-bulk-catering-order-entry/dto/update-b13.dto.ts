import { PartialType } from '@nestjs/swagger';
import { CreateB13Dto } from './create-b13.dto';

export class UpdateB13Dto extends PartialType(CreateB13Dto) {}
