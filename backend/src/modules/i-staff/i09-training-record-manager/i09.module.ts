import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I09Controller } from './i09.controller';
import { I09Service } from './i09.service';
import { I09Entity } from './i09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I09Entity])],
  controllers: [I09Controller],
  providers: [I09Service],
  exports: [I09Service],
})
export class I09Module {}
