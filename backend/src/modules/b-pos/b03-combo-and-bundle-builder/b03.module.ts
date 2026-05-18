import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B03Controller } from './b03.controller';
import { B03Service } from './b03.service';
import { B03Entity } from './b03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B03Entity])],
  controllers: [B03Controller],
  providers: [B03Service],
  exports: [B03Service],
})
export class B03Module {}
