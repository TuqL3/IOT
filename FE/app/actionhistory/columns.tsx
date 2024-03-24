'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format, isValid } from 'date-fns';

export type ActionHistory = {
  id: string;
  device: string;
  action: number;
  time: string;
};

export const columns: ColumnDef<ActionHistory>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'device',
    header: 'Device',
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
  {
    accessorKey: 'createdAt',
    header: 'Time',
    // Check if the date is valid before formatting
    // cell: ({ row }) => (isValid(new Date(row.original.time)) ? format(new Date(row.original.time), 'yyyy/MM/dd HH:mm:ss') : 'Invalid Date'),
  },
];
