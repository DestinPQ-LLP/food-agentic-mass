import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G09Controller } from './g09.controller';
import { G09Service } from './g09.service';
import { G09Entity } from './g09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G09Entity])],
  controllers: [G09Controller],
  providers: [G09Service],
  exports: [G09Service],
})
export class G09Module {}
