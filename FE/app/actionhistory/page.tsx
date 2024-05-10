'use client';

import { Search } from '@/components/search';
import { ActionHistory, columns } from './columns';
import { DataTable } from './data-table';
import { Filterachis } from '@/components/filterachis';
import { newRequest } from '@/lib/newRequest';
import { useEffect, useState } from 'react';
import Pagnination from '@/components/Pagnination';
import { SortActionId } from '@/components/sortactionId';
import { SortActionTime } from '@/components/sortactionTime';
import { SearchFieldsahis } from '@/components/searchFieldsahis';

interface DataObj {
  limit?: string;
  total?: string;
  data?: ActionHistory[];
}

export default function ActionHistoryPage() {
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
        let url = `/getActionHistory?page=${page}&filter=${
          filter ? filter : 'all'
        }`;
        if (sortBy && sortOrder) {
          url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }

        if (search && searchField) {
          url += `&search=${search}$searchField=${searchField}`;
        }

        const res = await newRequest.get(url);

        setData(res.data.data);
        setObj(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, search, filter, sortBy, sortOrder,search, searchField]);


  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-xl mb-2">Action history</h1>
      <div className="flex items-center gap-4">
        <Search setSearch={setSearch} />
        <SearchFieldsahis setSearchField={setSearchField} />
        <Filterachis setFilter={setFilter} />
        <SortActionId setSortBy={setSortBy} setSortOrder={setSortOrder} />
        <SortActionTime setSortBy={setSortBy} setSortOrder={setSortOrder} />
      </div>
      <DataTable columns={columns} data={data} />
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
