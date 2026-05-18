import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G18Controller } from './g18.controller';
import { G18Service } from './g18.service';
import { G18Entity } from './g18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G18Entity])],
  controllers: [G18Controller],
  providers: [G18Service],
  exports: [G18Service],
})
export class G18Module {}
