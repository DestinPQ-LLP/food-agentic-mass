import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N03Controller } from './n03.controller';
import { N03Service } from './n03.service';
import { N03Entity } from './n03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N03Entity])],
  controllers: [N03Controller],
  providers: [N03Service],
  exports: [N03Service],
})
export class N03Module {}
