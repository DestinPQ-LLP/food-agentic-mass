import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E03Controller } from './e03.controller';
import { E03Service } from './e03.service';
import { E03Entity } from './e03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E03Entity])],
  controllers: [E03Controller],
  providers: [E03Service],
  exports: [E03Service],
})
export class E03Module {}
