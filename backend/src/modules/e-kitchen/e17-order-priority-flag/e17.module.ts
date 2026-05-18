import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E17Controller } from './e17.controller';
import { E17Service } from './e17.service';
import { E17Entity } from './e17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E17Entity])],
  controllers: [E17Controller],
  providers: [E17Service],
  exports: [E17Service],
})
export class E17Module {}
