import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G10Controller } from './g10.controller';
import { G10Service } from './g10.service';
import { G10Entity } from './g10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G10Entity])],
  controllers: [G10Controller],
  providers: [G10Service],
  exports: [G10Service],
})
export class G10Module {}
