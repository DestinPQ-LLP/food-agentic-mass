import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N12Controller } from './n12.controller';
import { N12Service } from './n12.service';
import { N12Entity } from './n12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N12Entity])],
  controllers: [N12Controller],
  providers: [N12Service],
  exports: [N12Service],
})
export class N12Module {}
