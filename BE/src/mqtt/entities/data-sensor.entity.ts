import { Base } from 'src/common/base';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DataSensor extends Base {
  @ApiProperty({ description: 'tem' })
  @Column({ type: 'float' })
  tem: number;

  @ApiProperty({ description: 'hum' })
  @Column({ type: 'float' })
  hum: number;

  @ApiProperty({ description: 'lux' })
  @Column({ type: 'float' })
  lux: number;
}
