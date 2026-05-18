import { PartialType } from '@nestjs/swagger';
import { CreateF05Dto } from './create-f05.dto';

export class UpdateF05Dto extends PartialType(CreateF05Dto) {}
