import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I03Controller } from './i03.controller';
import { I03Service } from './i03.service';
import { I03Entity } from './i03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I03Entity])],
  controllers: [I03Controller],
  providers: [I03Service],
  exports: [I03Service],
})
export class I03Module {}
