import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A17Controller } from './a17.controller';
import { A17Service } from './a17.service';
import { A17Entity } from './a17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A17Entity])],
  controllers: [A17Controller],
  providers: [A17Service],
  exports: [A17Service],
})
export class A17Module {}
