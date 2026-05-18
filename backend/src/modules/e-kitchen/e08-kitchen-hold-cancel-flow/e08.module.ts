import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E08Controller } from './e08.controller';
import { E08Service } from './e08.service';
import { E08Entity } from './e08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E08Entity])],
  controllers: [E08Controller],
  providers: [E08Service],
  exports: [E08Service],
})
export class E08Module {}
