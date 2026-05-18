import { PartialType } from '@nestjs/swagger';
import { CreateC05Dto } from './create-c05.dto';

export class UpdateC05Dto extends PartialType(CreateC05Dto) {}
