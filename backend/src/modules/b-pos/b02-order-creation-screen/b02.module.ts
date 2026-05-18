import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B02Controller } from './b02.controller';
import { B02Service } from './b02.service';
import { B02Entity } from './b02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B02Entity])],
  controllers: [B02Controller],
  providers: [B02Service],
  exports: [B02Service],
})
export class B02Module {}
