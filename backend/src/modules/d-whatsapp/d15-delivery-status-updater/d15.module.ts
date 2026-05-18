import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D15Controller } from './d15.controller';
import { D15Service } from './d15.service';
import { D15Entity } from './d15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D15Entity])],
  controllers: [D15Controller],
  providers: [D15Service],
  exports: [D15Service],
})
export class D15Module {}
