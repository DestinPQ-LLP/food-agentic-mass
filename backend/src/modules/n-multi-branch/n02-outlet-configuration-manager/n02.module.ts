import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N02Controller } from './n02.controller';
import { N02Service } from './n02.service';
import { N02Entity } from './n02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N02Entity])],
  controllers: [N02Controller],
  providers: [N02Service],
  exports: [N02Service],
})
export class N02Module {}
