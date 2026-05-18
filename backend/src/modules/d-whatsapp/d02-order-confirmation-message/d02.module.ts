import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D02Controller } from './d02.controller';
import { D02Service } from './d02.service';
import { D02Entity } from './d02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D02Entity])],
  controllers: [D02Controller],
  providers: [D02Service],
  exports: [D02Service],
})
export class D02Module {}
