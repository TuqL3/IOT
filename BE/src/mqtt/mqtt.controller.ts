import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { ControlDeviceDto } from './dto/control-device';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('controlDevice')
  @ApiTags('Control Device')
  @ApiOperation({ summary: 'Control led and fan' })
  @ApiBody({
    type: ControlDeviceDto,
    examples: {
      den_on: {
        value: {
          topic: 'den',
          message: 'on',
        },
      },
      den_off: {
        value: {
          topic: 'den',
          message: 'off',
        },
      },
      quat_on: {
        value: {
          topic: 'quat',
          message: 'on',
        },
      },
      quat_off: {
        value: {
          topic: 'quat',
          message: 'off',
        },
      },
    },
  })
  async controlDevice(@Body() controlDeviceDto: ControlDeviceDto) {
    const status = await this.mqttService.controlDevice(controlDeviceDto);
    return status;
  }

  @Get('data')
  @ApiTags('Get data')
  @ApiOperation({
    summary: 'Retrieve temperature, humidity, and light information',
  })
  @ApiCreatedResponse({
    description: 'Get data successfully!!',
    content: {
      'application/json': {
        examples: {
          data: {
            value: [
              {
                id: 4649,
                createdAt: '2024-03-16T09:00:26.872Z',
                tem: 26,
                hum: 83,
                lux: 713,
              },
              {
                id: 4650,
                createdAt: '2024-03-16T09:00:29.871Z',
                tem: 26,
                hum: 83,
                lux: 713,
              },
              {
                id: 4651,
                createdAt: '2024-03-16T09:00:32.873Z',
                tem: 26,
                hum: 83,
                lux: 713,
              },
              {
                id: 4652,
                createdAt: '2024-03-16T09:00:35.877Z',
                tem: 26,
                hum: 82,
                lux: 713,
              },
              {
                id: 4653,
                createdAt: '2024-03-16T09:00:38.874Z',
                tem: 26,
                hum: 82,
                lux: 713,
              },
              {
                id: 4654,
                createdAt: '2024-03-16T09:00:41.876Z',
                tem: 26,
                hum: 83,
                lux: 713,
              },
              {
                id: 4655,
                createdAt: '2024-03-16T09:00:44.878Z',
                tem: 26,
                hum: 82,
                lux: 713,
              },
              {
                id: 4656,
                createdAt: '2024-03-16T09:00:47.877Z',
                tem: 26,
                hum: 82,
                lux: 715,
              },
            ],
          },
        },
      },
    },
  })
  async getData() {
    const data = await this.mqttService.getData();
    return data;
  }

  @Get('getActionHistory')
  @ApiTags('Get data')
  @ApiOperation({
    summary: 'Retrieve action history',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    examples: {
      'Page 1': {
        value: 1,
        description: 'Page 1',
      },
      'Page 10': {
        value: 10,
        description: `Page 10`,
      },
    },
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    examples: {
      'Limit to 5': {
        value: 5,
        description: 'Get 5 collection',
      },
      'Limit to 10': {
        value: 10,
        description: `Get 10 collection`,
      },
    },
  })
  @ApiQuery({
    name: 'search',
    type: String,
    allowEmptyValue: true,
    required: false,
    description: 'Search field: [createdAt, action]',
    examples: {
      On: {
        value: 'on',
      },
      '2024-03-16': {
        value: '2024-03-16',
      },
      Den: {
        value: 'den',
      },
    },
  })
  @ApiQuery({
    name: 'searchField',
    type: String,
    allowEmptyValue: true,
    required: false,
    examples: {
      Action: {
        value: 'action',
      },
      CreatedAt: {
        value: 'createdAt',
      },
      Device: {
        value: 'device',
      },
    },
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    examples: {
      Den: {
        value: 'den',
        description: 'Filter by den',
      },
      Quat: {
        value: 'quat',
        description: 'Filter by quat',
      },
      All: {
        value: 'all',
        description: 'All',
      },
    },
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    examples: {
      CreatedAt: {
        value: 'createdAt',
        description: 'Sort by createdAt',
      },
      id: {
        value: 'id',
        description: 'Sort by id',
      },
    },
  })
  @ApiQuery({
    name: 'sortOrder',
    type: String,
    examples: {
      ASC: {
        value: 'ASC',
        description: 'Increasing',
      },
      DESC: {
        value: 'DESC',
        description: 'Decreasing',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Get data successfully!!',
    content: {
      'application/json': {
        examples: {
          data: {
            value: {
              limit: '5',
              total: 43,
              data: [
                {
                  id: 1,
                  createdAt: '2024-03-16 09:32:31.142',
                  device: 'den',
                  action: 'on',
                },
                {
                  id: 5,
                  createdAt: '2024-03-16 09:33:24.893',
                  device: 'den',
                  action: 'on',
                },
                {
                  id: 7,
                  createdAt: '2024-03-16 09:33:27.697',
                  device: 'den',
                  action: 'on',
                },
                {
                  id: 11,
                  createdAt: '2024-03-16 09:33:44.684',
                  device: 'den',
                  action: 'on',
                },
                {
                  id: 13,
                  createdAt: '2024-03-16 10:20:34.008',
                  device: 'den',
                  action: 'on',
                },
              ],
              page: '1',
            },
          },
        },
      },
    },
  })
  async getActionHistory(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('searchField') searchField: string = '',
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = '',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const data = await this.mqttService.getActionHistory(
      page,
      limit,
      search,
      searchField,
      filter,
      sortBy,
      sortOrder,
    );
    return data;
  }

  @Get('getDataSensor')
  @ApiTags('Get data')
  @ApiOperation({
    summary: 'Retrieve data sensor',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    examples: {
      'Page 1': {
        value: 1,
        description: 'Page 1',
      },
      'Page 10': {
        value: 10,
        description: `Page 10`,
      },
    },
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    examples: {
      'Limit to 5': {
        value: 5,
        description: 'Get 5 collection',
      },
      'Limit to 10': {
        value: 10,
        description: `Get 10 collection`,
      },
    },
  })
  @ApiQuery({
    name: 'search',
    type: String || Number,
    required: false,
    allowEmptyValue: true,
    examples: {
      Temperature: {
        value: 26,
      },
      Humidity: {
        value: 90,
      },
      Lux: {
        value: 668,
      },
      CreatedAt: {
        value: '2024-03-16',
      },
    },
  })
  @ApiQuery({
    name: 'searchField',
    type: String,
    allowEmptyValue: true,
    required: false,
    examples: {
      CreatedAt: {
        value: 'createdAt',
      },
      Tem: {
        value: 'tem',
      },
      Hum: {
        value: 'hum',
      },
      Lux: {
        value: 'lux',
      },
    },
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    examples: {
      Humidity: {
        value: 'hum',
        description: 'Filter by hum',
      },
      Temperature: {
        value: 'tem',
        description: 'Filter by tem',
      },
      Lux: {
        value: 'lux',
        description: 'Filter by lux',
      },
      All: {
        value: 'all',
        description: 'None',
      },
    },
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    examples: {
      CreatedAt: {
        value: 'createdAt',
        description: 'Sort by createdAt',
      },
      id: {
        value: 'id',
        description: 'Sort by id',
      },
      Humidity: {
        value: 'hum',
        description: 'Sort by hum',
      },
      Temperature: {
        value: 'tem',
        description: 'Sort by tem',
      },
      Lux: {
        value: 'lux',
        description: 'Sort by lux',
      },
    },
  })
  @ApiQuery({
    name: 'sortOrder',
    type: String,
    examples: {
      ASC: {
        value: 'ASC',
        description: 'Increasing',
      },
      DESC: {
        value: 'DESC',
        description: 'Decreasing',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Get data successfully!!',
    content: {
      'application/json': {
        examples: {
          data: {
            value: {
              limit: '5',
              total: 838,
              data: [
                {
                  id: 3819,
                  createdAt: '2024-03-16 11:30:58.498',
                  hum: 81,
                },
                {
                  id: 3820,
                  createdAt: '2024-03-16 11:31:01.506',
                  hum: 82,
                },
                {
                  id: 3821,
                  createdAt: '2024-03-16 11:31:04.502',
                  hum: 82,
                },
                {
                  id: 3822,
                  createdAt: '2024-03-16 11:31:07.504',
                  hum: 82,
                },
                {
                  id: 3823,
                  createdAt: '2024-03-16 11:31:10.503',
                  hum: 82,
                },
              ],
              page: '1',
            },
          },
        },
      },
    },
  })
  async getDataSensor(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('searchField') searchField: string = '',
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: string = '',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const data = await this.mqttService.getDataSensor(
      page,
      limit,
      search,
      searchField,
      filter,
      sortBy,
      sortOrder,
    );
    return data;
  }
}
