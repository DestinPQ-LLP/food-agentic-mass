import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L14Controller } from './l14.controller';
import { L14Service } from './l14.service';
import { L14Entity } from './l14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L14Entity])],
  controllers: [L14Controller],
  providers: [L14Service],
  exports: [L14Service],
})
export class L14Module {}
