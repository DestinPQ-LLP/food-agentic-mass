import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L06Controller } from './l06.controller';
import { L06Service } from './l06.service';
import { L06Entity } from './l06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L06Entity])],
  controllers: [L06Controller],
  providers: [L06Service],
  exports: [L06Service],
})
export class L06Module {}
