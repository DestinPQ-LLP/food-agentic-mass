import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G05Controller } from './g05.controller';
import { G05Service } from './g05.service';
import { G05Entity } from './g05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G05Entity])],
  controllers: [G05Controller],
  providers: [G05Service],
  exports: [G05Service],
})
export class G05Module {}
