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

export const columnsLux: ColumnDef<DataSensor>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'lux',
    header: 'Lux',
  },

  {
    accessorKey: 'createdAt',
    header: 'Create At',
  },
];
