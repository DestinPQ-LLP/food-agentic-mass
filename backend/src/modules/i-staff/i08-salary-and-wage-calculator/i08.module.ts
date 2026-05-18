import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I08Controller } from './i08.controller';
import { I08Service } from './i08.service';
import { I08Entity } from './i08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I08Entity])],
  controllers: [I08Controller],
  providers: [I08Service],
  exports: [I08Service],
})
export class I08Module {}
