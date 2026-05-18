import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I15Controller } from './i15.controller';
import { I15Service } from './i15.service';
import { I15Entity } from './i15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I15Entity])],
  controllers: [I15Controller],
  providers: [I15Service],
  exports: [I15Service],
})
export class I15Module {}
