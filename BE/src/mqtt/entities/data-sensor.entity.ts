import { Base } from 'src/common/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class DataSensor extends Base {
  @Column({type: 'float'})
  tem: number;

  @Column({type: 'float'})
  hum: number;

  @Column({type: 'float'})
  lux: number;
}
