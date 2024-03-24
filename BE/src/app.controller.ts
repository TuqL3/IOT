import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('HealthCheck')
  @ApiCreatedResponse({
    description: 'Hello World',
    content: {
      'application/json': {
        examples: {
          data: {
            value: 'Hello World!',
          },
        },
      },
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
