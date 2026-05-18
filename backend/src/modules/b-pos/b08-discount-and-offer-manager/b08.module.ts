import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B08Controller } from './b08.controller';
import { B08Service } from './b08.service';
import { B08Entity } from './b08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B08Entity])],
  controllers: [B08Controller],
  providers: [B08Service],
  exports: [B08Service],
})
export class B08Module {}
