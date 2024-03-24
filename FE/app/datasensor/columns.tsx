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

export const columns: ColumnDef<DataSensor>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'tem',
    header: 'Tem',
  },
  {
    accessorKey: 'hum',
    header: 'Hum',
  },
  {
    accessorKey: 'lux',
    header: 'Lux',
  },

  {
    accessorKey: 'createdAt',
    header: 'Create At',
    // cell: ({ row }) =>
    //   isValid(new Date(row.original.createdAt))
    //     ? format(new Date(row.original.create_at), 'yyyy/MM/dd HH:mm:ss')
    //     : 'Invalid Date',
  },
];
