import { PartialType } from '@nestjs/swagger';
import { CreateN02Dto } from './create-n02.dto';

export class UpdateN02Dto extends PartialType(CreateN02Dto) {}
