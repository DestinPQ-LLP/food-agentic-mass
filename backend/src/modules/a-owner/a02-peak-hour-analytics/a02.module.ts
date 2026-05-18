import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A02Controller } from './a02.controller';
import { A02Service } from './a02.service';
import { A02Entity } from './a02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A02Entity])],
  controllers: [A02Controller],
  providers: [A02Service],
  exports: [A02Service],
})
export class A02Module {}
