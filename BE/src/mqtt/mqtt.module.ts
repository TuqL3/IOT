import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionHistory } from './entities/action-history.entity';
import { DataSensor } from './entities/data-sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionHistory,DataSensor])],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
