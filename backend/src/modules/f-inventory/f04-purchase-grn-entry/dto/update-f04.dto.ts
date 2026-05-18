import { PartialType } from '@nestjs/swagger';
import { CreateF04Dto } from './create-f04.dto';

export class UpdateF04Dto extends PartialType(CreateF04Dto) {}
