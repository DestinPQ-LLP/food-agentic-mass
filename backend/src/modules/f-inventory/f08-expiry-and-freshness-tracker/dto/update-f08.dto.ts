import { PartialType } from '@nestjs/swagger';
import { CreateF08Dto } from './create-f08.dto';

export class UpdateF08Dto extends PartialType(CreateF08Dto) {}
