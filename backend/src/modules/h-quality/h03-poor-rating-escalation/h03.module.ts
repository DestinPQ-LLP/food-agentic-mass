import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H03Controller } from './h03.controller';
import { H03Service } from './h03.service';
import { H03Entity } from './h03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H03Entity])],
  controllers: [H03Controller],
  providers: [H03Service],
  exports: [H03Service],
})
export class H03Module {}
