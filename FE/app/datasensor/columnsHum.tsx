'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format, isValid } from 'date-fns';

export type DataSensor = {
  id: string;
  tem: string;
  hum: string;
  lux: string;
  createdAt: string;
};

export const columnsHum: ColumnDef<DataSensor>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'hum',
    header: 'Hum',
  },

  {
    accessorKey: 'createdAt',
    header: 'Create At',
  },
];
