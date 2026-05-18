import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B05Controller } from './b05.controller';
import { B05Service } from './b05.service';
import { B05Entity } from './b05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B05Entity])],
  controllers: [B05Controller],
  providers: [B05Service],
  exports: [B05Service],
})
export class B05Module {}
