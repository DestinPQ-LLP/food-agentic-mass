import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K03Controller } from './k03.controller';
import { K03Service } from './k03.service';
import { K03Entity } from './k03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K03Entity])],
  controllers: [K03Controller],
  providers: [K03Service],
  exports: [K03Service],
})
export class K03Module {}
