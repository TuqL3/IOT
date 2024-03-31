import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import { ControlDeviceDto } from './dto/control-device';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionHistory } from './entities/action-history.entity';
import { format } from 'date-fns';
import { DataSensor } from './entities/data-sensor.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MqttService {
  private client: MqttClient;

  constructor(
    @InjectRepository(ActionHistory)
    private actionRepo: Repository<ActionHistory>,
    @InjectRepository(DataSensor)
    private datasensorRepo: Repository<DataSensor>,
    private configService: ConfigService,
  ) {
    const username = configService.get('MQTT_USERNAME');
    const password = configService.get('MQTT_PASSWORD');
    const options: mqtt.IClientOptions = {
      username,
      password,
    };
    this.client = mqtt.connect(configService.get('MQTT_URL'), options);
    this.client.on('connect', () => {
      console.log('MQTT Connected');
      this.subscribeToDataTopic();
    });
    this.client.on('error', () => {
      console.log('MQTT error');
    });
    this.client.setMaxListeners(20);
  }

  private subscribeToDataTopic(): void {
    const topic = 'data';
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('Error subscribing to topic:', topic, err);
      } else {
        console.log('Subscribed to topic:', topic);
      }
    });

    this.client.on('message', async (receivedTopic, message) => {
      if (receivedTopic === topic) {
        const dataString: string = message.toString();
        const parts: string[] = dataString.split(',');
        let tem: number;
        let hum: number;
        let lux: number;

        parts.forEach((part: string) => {
          const keyValue: string[] = part.trim().split(':');

          if (keyValue.length === 2) {
            const key: string = keyValue[0].trim();
            const value: string = keyValue[1].trim();

            switch (key) {
              case 'Temp':
                tem = parseFloat(value);
                break;
              case 'Hum':
                hum = parseFloat(value);
                break;
              case 'Light':
                lux = parseFloat(value);
                break;
            }
          }
        });

        if (!isNaN(tem) && !isNaN(hum) && !isNaN(lux)) {
          try {
            const datasensor = this.datasensorRepo.create({
              tem: tem,
              hum: hum,
              lux: lux,
            });

            await this.datasensorRepo.save(datasensor);
            console.log('Data saved to database:', datasensor);
          } catch (error) {
            console.error('Error saving data to database:', error);
          }
        } else {
          console.error('Invalid data format:', dataString);
        }
      }
    });
  }

  async controlDevice(controlDeviceDto: ControlDeviceDto) {
    const action = this.actionRepo.create({
      device: controlDeviceDto.topic,
      action: controlDeviceDto.message,
    });

    await this.actionRepo.save(action);

    this.client.publish(controlDeviceDto.topic, controlDeviceDto.message);
    return new Promise((resolve, reject) => {
      const topic = controlDeviceDto.topic === 'den' ? 'ttden' : 'ttquat';

      const handleData = (data) => {
        this.client.unsubscribe(topic);
        resolve(data);
      };

      this.client.subscribe(topic, (err, granted) => {
        if (err) {
          reject(err);
        } else {
          this.client.on('message', (topic, message) => {
            handleData(message.toString());
          });
        }
      });
    });
  }

  async getData(): Promise<DataSensor[]> {
    try {
      const latestData = await this.datasensorRepo.find({
        order: {
          createdAt: 'DESC',
        },
        take: 8,
      });
      return latestData.reverse();
    } catch (error) {
      console.error('Error getting latest data:', error);
      throw error;
    }
  }

  async getActionHistory(
    page: number,
    limit: number,
    search: string,
    filter: string,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    let queryBuilder = this.actionRepo.createQueryBuilder('action_history');

    if (filter !== 'all') {
      queryBuilder = queryBuilder.where('action_history.device = :device', {
        device: filter,
      });
    }

    if (search) {
      const searchDate = new Date(search);
      if (!isNaN(searchDate.getTime())) {
        const nextDay = new Date(
          new Date(searchDate).setDate(searchDate.getDate() + 1),
        );
        queryBuilder = queryBuilder.andWhere(
          'action_history.createdAt BETWEEN :start AND :end',
          {
            start: searchDate,
            end: nextDay,
          },
        );
      } else {
        queryBuilder = queryBuilder.andWhere(
          'action_history.action LIKE :search',
          { search: `%${search}%` },
        );
      }
    }

    if (sortBy === 'createdAt' || sortBy === 'id') {
      queryBuilder = queryBuilder.orderBy(
        `action_history.${sortBy}`,
        sortOrder,
      );
    } else {
      queryBuilder = queryBuilder.orderBy('action_history.id', sortOrder);
    }
    const total = await queryBuilder.getCount();
    const data = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    data.forEach((item: any) => {
      item.createdAt = format(
        new Date(item.createdAt),
        'yyyy-MM-dd HH:mm:ss.SSS',
      );
    });

    return {
      limit,
      total,
      data,
      page,
    };
  }

  async getDataSensor(
    page: number,
    limit: number,
    search: string | undefined,
    filter: string,
    sortBy: string,
    sortOrder: string,
  ) {
    const skip = (page - 1) * limit;

    let queryBuilder = this.datasensorRepo.createQueryBuilder('data_sensor');

    if (search) {
      const searchValue = parseFloat(search);
      if (!isNaN(searchValue)) {
        queryBuilder = queryBuilder.where(
          '(data_sensor.hum >= :searchValue AND data_sensor.hum <= :searchValue) OR (data_sensor.tem >= :searchValue AND data_sensor.tem <= :searchValue) OR (data_sensor.lux >= :searchValue AND data_sensor.lux <= :searchValue)',
          { searchValue },
        );
      } else {
        const searchDate = new Date(search);
        const nextDay = new Date(
          new Date(searchDate).setDate(searchDate.getDate() + 1),
        );
        queryBuilder = queryBuilder.andWhere(
          'data_sensor.createdAt BETWEEN :start AND :end',
          {
            start: searchDate,
            end: nextDay,
          },
        );
      }
    }
    if (filter && ['hum', 'tem', 'lux'].includes(filter)) {
      switch (filter) {
        case 'hum':
          queryBuilder = queryBuilder.select([
            'data_sensor.id',
            'data_sensor.hum',
            'data_sensor.createdAt',
          ]);
          break;
        case 'tem':
          queryBuilder = queryBuilder.select([
            'data_sensor.id',
            'data_sensor.tem',
            'data_sensor.createdAt',
          ]);

          break;
        case 'lux':
          queryBuilder = queryBuilder.select([
            'data_sensor.id',
            'data_sensor.lux',
            'data_sensor.createdAt',
          ]);

          break;
        default:
          break;
      }
    }

    const orderByClause: { [key: string]: 'ASC' | 'DESC' } = {};
    switch (sortBy) {
      case 'createdAt':
        orderByClause['data_sensor.createdAt'] = sortOrder as 'ASC' | 'DESC';
        break;
      case 'hum':
        orderByClause['data_sensor.hum'] = sortOrder as 'ASC' | 'DESC';
        break;
      case 'tem':
        orderByClause['data_sensor.tem'] = sortOrder as 'ASC' | 'DESC';
        break;
      case 'lux':
        orderByClause['data_sensor.lux'] = sortOrder as 'ASC' | 'DESC';
        break;
      case 'id':
        orderByClause['data_sensor.id'] = sortOrder as 'ASC' | 'DESC';
        break;
      default:
        orderByClause['data_sensor.id'] = 'ASC';
        break;
    }

    const total = await queryBuilder.getCount();

    const data = await queryBuilder
      .orderBy(orderByClause)
      .skip(skip)
      .take(limit)
      .getMany();
    data.forEach((item: any) => {
      item.createdAt = format(
        new Date(item.createdAt),
        'yyyy-MM-dd HH:mm:ss.SSS',
      );
    });

    return {
      limit,
      total,
      data,
      page,
    };
  }
}
