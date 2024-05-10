'use client';

import { Search } from '@/components/search';
import { DataSensor, columns } from './columns';
import { DataTable } from './data-table';
import { Filterdtsensor } from '@/components/filterdtsensor';
import { useEffect, useState } from 'react';
import { newRequest } from '@/lib/newRequest';
import Pagnination from '@/components/Pagnination';
import { Filterachis } from '@/components/filterachis';
import { SortActionId } from '@/components/sortactionId';
import { SortActionTime } from '@/components/sortactionTime';
import { columnsTem } from './columnsTem';
import { columnsHum } from './columnsHum';
import { columnsLux } from './columnsLux';
import { SortTemp } from '@/components/sortTemp';
import { SortHum } from '@/components/sortHum';
import { SortLux } from '@/components/sortLux';
import { SearchFieldsdtsensor } from '@/components/searchFieldsdtsensor';

interface DataObj {
  limit?: string;
  total?: string;
  data?: DataSensor[];
}

export default function DataSensorPage() {
  const [data, setData] = useState([]);
  const [obj, setObj] = useState<DataObj>({});
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        let url = `/getDataSensor?page=${page}&filter=${
          filter ? 'all' : 'all'
        }`;
        if (sortBy && sortOrder) {
          url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }

        if (search && searchField) {
          url += `&search=${search}&searchField=${searchField}`;
        }

        const res = await newRequest.get(url);

        setData(res.data.data);
        setObj(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, search, filter, sortBy, sortOrder, search,searchField]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-xl mb-2">Data sensor</h1>
      <div className="flex items-center gap-4">
        <Search setSearch={setSearch} />
        <SearchFieldsdtsensor setSearchField={setSearchField} />
        <Filterdtsensor setFilter={setFilter} />
        <SortActionId setSortBy={setSortBy} setSortOrder={setSortOrder} />
        <SortActionTime setSortBy={setSortBy} setSortOrder={setSortOrder} />

        {filter === 'temp' ? (
          <SortTemp setSortBy={setSortBy} setSortOrder={setSortOrder} />
        ) : filter === 'hum' ? (
          <SortHum setSortBy={setSortBy} setSortOrder={setSortOrder} />
        ) : filter === 'lux' ? (
          <SortLux setSortBy={setSortBy} setSortOrder={setSortOrder} />
        ) : (
          ''
        )}
      </div>
      <DataTable
        columns={
          filter === 'lux'
            ? columnsLux
            : filter === 'temp'
            ? columnsTem
            : filter === 'hum'
            ? columnsHum
            : columns
        }
        data={data}
      />
      <div className="flex items-center justify-center my-4">
        <Pagnination
          limit={obj.limit ? obj.limit : 0}
          page={page}
          total={obj.total ? obj.total : 0}
          setPage={(page: number) => setPage(page)}
        />
      </div>
    </div>
  );
}
