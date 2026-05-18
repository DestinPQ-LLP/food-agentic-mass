import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A14Controller } from './a14.controller';
import { A14Service } from './a14.service';
import { A14Entity } from './a14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A14Entity])],
  controllers: [A14Controller],
  providers: [A14Service],
  exports: [A14Service],
})
export class A14Module {}
