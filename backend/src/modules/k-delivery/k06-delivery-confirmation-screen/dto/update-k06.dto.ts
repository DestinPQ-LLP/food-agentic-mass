import { PartialType } from '@nestjs/swagger';
import { CreateK06Dto } from './create-k06.dto';

export class UpdateK06Dto extends PartialType(CreateK06Dto) {}
