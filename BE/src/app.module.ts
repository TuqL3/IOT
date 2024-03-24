import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionHistory } from './mqtt/entities/action-history.entity';
import { DataSensor } from './mqtt/entities/data-sensor.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'iot',
        entities: [ActionHistory,DataSensor],
        synchronize: true,
      }),
    }),
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
