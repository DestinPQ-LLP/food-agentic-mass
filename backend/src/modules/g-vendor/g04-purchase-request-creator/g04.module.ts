import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G04Controller } from './g04.controller';
import { G04Service } from './g04.service';
import { G04Entity } from './g04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G04Entity])],
  controllers: [G04Controller],
  providers: [G04Service],
  exports: [G04Service],
})
export class G04Module {}
