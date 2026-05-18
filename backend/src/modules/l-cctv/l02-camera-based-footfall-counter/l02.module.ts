import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L02Controller } from './l02.controller';
import { L02Service } from './l02.service';
import { L02Entity } from './l02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L02Entity])],
  controllers: [L02Controller],
  providers: [L02Service],
  exports: [L02Service],
})
export class L02Module {}
