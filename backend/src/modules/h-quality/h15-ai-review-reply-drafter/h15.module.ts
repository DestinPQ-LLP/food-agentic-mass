import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H15Controller } from './h15.controller';
import { H15Service } from './h15.service';
import { H15Entity } from './h15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H15Entity])],
  controllers: [H15Controller],
  providers: [H15Service],
  exports: [H15Service],
})
export class H15Module {}
