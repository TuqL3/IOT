import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'createdAt' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
