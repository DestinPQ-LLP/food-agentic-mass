import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F03Controller } from './f03.controller';
import { F03Service } from './f03.service';
import { F03Entity } from './f03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F03Entity])],
  controllers: [F03Controller],
  providers: [F03Service],
  exports: [F03Service],
})
export class F03Module {}
