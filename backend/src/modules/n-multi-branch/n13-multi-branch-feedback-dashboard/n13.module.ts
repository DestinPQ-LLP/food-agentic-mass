import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N13Controller } from './n13.controller';
import { N13Service } from './n13.service';
import { N13Entity } from './n13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N13Entity])],
  controllers: [N13Controller],
  providers: [N13Service],
  exports: [N13Service],
})
export class N13Module {}
