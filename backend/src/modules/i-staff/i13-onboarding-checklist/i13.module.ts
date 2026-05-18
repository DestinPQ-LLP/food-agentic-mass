import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I13Controller } from './i13.controller';
import { I13Service } from './i13.service';
import { I13Entity } from './i13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I13Entity])],
  controllers: [I13Controller],
  providers: [I13Service],
  exports: [I13Service],
})
export class I13Module {}
