import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G12Controller } from './g12.controller';
import { G12Service } from './g12.service';
import { G12Entity } from './g12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G12Entity])],
  controllers: [G12Controller],
  providers: [G12Service],
  exports: [G12Service],
})
export class G12Module {}
