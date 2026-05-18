import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D03Controller } from './d03.controller';
import { D03Service } from './d03.service';
import { D03Entity } from './d03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D03Entity])],
  controllers: [D03Controller],
  providers: [D03Service],
  exports: [D03Service],
})
export class D03Module {}
