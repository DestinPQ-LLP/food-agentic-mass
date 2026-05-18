import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N08Controller } from './n08.controller';
import { N08Service } from './n08.service';
import { N08Entity } from './n08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N08Entity])],
  controllers: [N08Controller],
  providers: [N08Service],
  exports: [N08Service],
})
export class N08Module {}
