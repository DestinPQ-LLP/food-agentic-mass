import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N05Controller } from './n05.controller';
import { N05Service } from './n05.service';
import { N05Entity } from './n05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N05Entity])],
  controllers: [N05Controller],
  providers: [N05Service],
  exports: [N05Service],
})
export class N05Module {}
