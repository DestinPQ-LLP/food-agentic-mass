import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B15Controller } from './b15.controller';
import { B15Service } from './b15.service';
import { B15Entity } from './b15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B15Entity])],
  controllers: [B15Controller],
  providers: [B15Service],
  exports: [B15Service],
})
export class B15Module {}
