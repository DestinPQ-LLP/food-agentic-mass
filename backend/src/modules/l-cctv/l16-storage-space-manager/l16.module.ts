import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L16Controller } from './l16.controller';
import { L16Service } from './l16.service';
import { L16Entity } from './l16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L16Entity])],
  controllers: [L16Controller],
  providers: [L16Service],
  exports: [L16Service],
})
export class L16Module {}
