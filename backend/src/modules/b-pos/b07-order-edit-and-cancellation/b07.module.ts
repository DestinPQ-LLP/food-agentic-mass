import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B07Controller } from './b07.controller';
import { B07Service } from './b07.service';
import { B07Entity } from './b07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B07Entity])],
  controllers: [B07Controller],
  providers: [B07Service],
  exports: [B07Service],
})
export class B07Module {}
