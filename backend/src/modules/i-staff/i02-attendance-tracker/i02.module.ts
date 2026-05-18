import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I02Controller } from './i02.controller';
import { I02Service } from './i02.service';
import { I02Entity } from './i02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I02Entity])],
  controllers: [I02Controller],
  providers: [I02Service],
  exports: [I02Service],
})
export class I02Module {}
