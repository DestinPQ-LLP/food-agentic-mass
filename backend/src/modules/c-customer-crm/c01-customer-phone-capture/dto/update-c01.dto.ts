import { PartialType } from '@nestjs/swagger';
import { CreateC01Dto } from './create-c01.dto';

export class UpdateC01Dto extends PartialType(CreateC01Dto) {}
