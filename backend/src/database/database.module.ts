import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('database.host'),
        port: cfg.get<number>('database.port'),
        username: cfg.get<string>('database.user'),
        password: cfg.get<string>('database.pass'),
        database: cfg.get<string>('database.name'),
        ssl: cfg.get<boolean>('database.ssl') ? { rejectUnauthorized: false } : false,
        entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
        migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
