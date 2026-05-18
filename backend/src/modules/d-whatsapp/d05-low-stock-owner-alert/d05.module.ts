import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D05Controller } from './d05.controller';
import { D05Service } from './d05.service';
import { D05Entity } from './d05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D05Entity])],
  controllers: [D05Controller],
  providers: [D05Service],
  exports: [D05Service],
})
export class D05Module {}
