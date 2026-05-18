import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G06Controller } from './g06.controller';
import { G06Service } from './g06.service';
import { G06Entity } from './g06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G06Entity])],
  controllers: [G06Controller],
  providers: [G06Service],
  exports: [G06Service],
})
export class G06Module {}
