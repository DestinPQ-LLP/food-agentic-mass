import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D12Controller } from './d12.controller';
import { D12Service } from './d12.service';
import { D12Entity } from './d12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D12Entity])],
  controllers: [D12Controller],
  providers: [D12Service],
  exports: [D12Service],
})
export class D12Module {}
