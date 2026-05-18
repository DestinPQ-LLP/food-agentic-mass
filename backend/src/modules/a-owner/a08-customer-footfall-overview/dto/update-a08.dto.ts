import { PartialType } from '@nestjs/swagger';
import { CreateA08Dto } from './create-a08.dto';

export class UpdateA08Dto extends PartialType(CreateA08Dto) {}
