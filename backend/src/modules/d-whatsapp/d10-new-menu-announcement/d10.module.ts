import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D10Controller } from './d10.controller';
import { D10Service } from './d10.service';
import { D10Entity } from './d10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D10Entity])],
  controllers: [D10Controller],
  providers: [D10Service],
  exports: [D10Service],
})
export class D10Module {}
