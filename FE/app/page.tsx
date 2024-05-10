'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import LineChart from '@/components/LineChart';
import { Light } from '@/components/Light';
import { Fanctrl } from '@/components/Fan';
import Temperature from '@/components/Temperature';
import Humidity from '@/components/Humidity';
import Lux from '@/components/Lux';
import { useEffect, useState } from 'react';
import { newRequest } from '@/lib/newRequest';
import { Aircondition } from '@/components/Aircondition';
export type DataItem = {
  createdAt: string;
  hum: number;
  tem: number;
  lux: number;
};
export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await newRequest.get('/data');
        const reversedData = res.data.map((item: DataItem) => ({
          ...item,
          createdAt: formatDate(item.createdAt),
        }));
        setData(reversedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center justify-center ">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[80vh] max-w-[80vw] rounded-lg border"
      >
        <ResizablePanel defaultSize={66}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={33}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                  <div
                    className={`
                    h-full 
                     ${
                       data[data.length - 1]?.tem < 30
                         ? 'bg-gradient-to-tr from-green-400 to-red-300 p-4'
                         : data[data.length - 1]?.tem >= 30 &&
                           data[data.length - 1]?.tem <= 50
                         ? 'bg-gradient-to-tr from-yellow-400 to-green-400 p-4'
                         : 'bg-gradient-to-tr from-red-400 to-yellow-400 p-4'
                     }`}
                  >
                    <Temperature data={data[data.length - 1]} />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <div
                    className={`h-full  ${
                      data[data.length - 1]?.hum < 30
                        ? 'bg-gradient-to-tr from-orange-500 to-red-300 p-4'
                        : data[data.length - 1]?.hum >= 30 &&
                          data[data.length - 1]?.hum <= 50
                        ? 'bg-gradient-to-tr from-red-300 to-violet-400 p-4'
                        : 'bg-gradient-to-tr from-violet-400 to-green-400 p-4'
                    }`}
                  >
                    <Humidity data={data[data.length - 1]} />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={66}>
              <div className="flex h-full items-center justify-center p-6">
                <LineChart data={data} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={33}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={33}>
              <div
                className={`h-full  ${
                  data[data.length - 1]?.lux < 300
                    ? 'bg-gradient-to-tr from-yellow-400 to-red-300 p-4'
                    : data[data.length - 1]?.lux >= 300 &&
                      data[data.length - 1]?.lux <= 800
                    ? 'bg-gradient-to-tr from-red-400 to-blue-400 p-4'
                    : 'bg-gradient-to-tr from-blue-400 to-red-400 p-4'
                }`}
              >
                <Lux data={data[data.length - 1]} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={22}>
              <div className="flex h-full items-center justify-center p-6">
                <Light />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={22}>
              <div className="flex h-full items-center justify-center p-6">
                <Fanctrl />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={22}>
              <div className="flex h-full items-center justify-center p-6">
                <Aircondition />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
