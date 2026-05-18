import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M03Controller } from './m03.controller';
import { M03Service } from './m03.service';
import { M03Entity } from './m03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M03Entity])],
  controllers: [M03Controller],
  providers: [M03Service],
  exports: [M03Service],
})
export class M03Module {}
