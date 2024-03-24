import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/common/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class ActionHistory extends Base {
  @ApiProperty({ description: 'Device' })
  @Column()
  device: string;
  @ApiProperty({ description: 'Device' })
  @Column()
  action: string;
}
