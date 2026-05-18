import { PartialType } from '@nestjs/swagger';
import { CreateA11Dto } from './create-a11.dto';

export class UpdateA11Dto extends PartialType(CreateA11Dto) {}
