import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G02Controller } from './g02.controller';
import { G02Service } from './g02.service';
import { G02Entity } from './g02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G02Entity])],
  controllers: [G02Controller],
  providers: [G02Service],
  exports: [G02Service],
})
export class G02Module {}
