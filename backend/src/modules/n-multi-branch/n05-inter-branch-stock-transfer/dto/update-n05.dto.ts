import { PartialType } from '@nestjs/swagger';
import { CreateN05Dto } from './create-n05.dto';

export class UpdateN05Dto extends PartialType(CreateN05Dto) {}
