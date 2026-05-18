import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B17Controller } from './b17.controller';
import { B17Service } from './b17.service';
import { B17Entity } from './b17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B17Entity])],
  controllers: [B17Controller],
  providers: [B17Service],
  exports: [B17Service],
})
export class B17Module {}
