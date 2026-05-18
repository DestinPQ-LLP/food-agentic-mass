import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A03Controller } from './a03.controller';
import { A03Service } from './a03.service';
import { A03Entity } from './a03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A03Entity])],
  controllers: [A03Controller],
  providers: [A03Service],
  exports: [A03Service],
})
export class A03Module {}
