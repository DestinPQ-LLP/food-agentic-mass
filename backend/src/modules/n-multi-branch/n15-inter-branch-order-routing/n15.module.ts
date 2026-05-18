import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N15Controller } from './n15.controller';
import { N15Service } from './n15.service';
import { N15Entity } from './n15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N15Entity])],
  controllers: [N15Controller],
  providers: [N15Service],
  exports: [N15Service],
})
export class N15Module {}
