import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G01Controller } from './g01.controller';
import { G01Service } from './g01.service';
import { G01Entity } from './g01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G01Entity])],
  controllers: [G01Controller],
  providers: [G01Service],
  exports: [G01Service],
})
export class G01Module {}
