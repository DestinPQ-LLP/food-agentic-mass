import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E09Controller } from './e09.controller';
import { E09Service } from './e09.service';
import { E09Entity } from './e09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E09Entity])],
  controllers: [E09Controller],
  providers: [E09Service],
  exports: [E09Service],
})
export class E09Module {}
