import { PartialType } from '@nestjs/swagger';
import { CreateI05Dto } from './create-i05.dto';

export class UpdateI05Dto extends PartialType(CreateI05Dto) {}
