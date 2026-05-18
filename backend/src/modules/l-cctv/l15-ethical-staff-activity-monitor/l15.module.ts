import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L15Controller } from './l15.controller';
import { L15Service } from './l15.service';
import { L15Entity } from './l15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L15Entity])],
  controllers: [L15Controller],
  providers: [L15Service],
  exports: [L15Service],
})
export class L15Module {}
