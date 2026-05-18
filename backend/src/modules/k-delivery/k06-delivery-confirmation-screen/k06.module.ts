import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K06Controller } from './k06.controller';
import { K06Service } from './k06.service';
import { K06Entity } from './k06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K06Entity])],
  controllers: [K06Controller],
  providers: [K06Service],
  exports: [K06Service],
})
export class K06Module {}
