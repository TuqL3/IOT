import { ApiProperty } from '@nestjs/swagger';

export class ControlDeviceDto {
  @ApiProperty({ example: 'den', description: 'Topic for controlling device' })
  topic: string;
  @ApiProperty({
    example: 'on',
    description: 'Message to send for controlling the device',
  })
  message: string;
}
