import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K15Controller } from './k15.controller';
import { K15Service } from './k15.service';
import { K15Entity } from './k15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K15Entity])],
  controllers: [K15Controller],
  providers: [K15Service],
  exports: [K15Service],
})
export class K15Module {}
