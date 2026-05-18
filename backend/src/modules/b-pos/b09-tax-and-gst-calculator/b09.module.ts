import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B09Controller } from './b09.controller';
import { B09Service } from './b09.service';
import { B09Entity } from './b09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B09Entity])],
  controllers: [B09Controller],
  providers: [B09Service],
  exports: [B09Service],
})
export class B09Module {}
