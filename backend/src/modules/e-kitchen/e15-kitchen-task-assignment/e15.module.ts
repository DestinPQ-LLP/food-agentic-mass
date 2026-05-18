import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E15Controller } from './e15.controller';
import { E15Service } from './e15.service';
import { E15Entity } from './e15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E15Entity])],
  controllers: [E15Controller],
  providers: [E15Service],
  exports: [E15Service],
})
export class E15Module {}
