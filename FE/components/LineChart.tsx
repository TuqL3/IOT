'use client';

import { log } from 'console';
import React, { useState, useEffect, ReactNode } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataItem {
  createdAt: string;
  hum: number;
  tem: number;
  lux: number;
}

interface ExampleProps {
  data: any;
}

const Example: React.FC<ExampleProps> = ({ data }) => {
  const [hiddenLines, setHiddenLines] = useState<Record<string, boolean>>({});

  const handleLegendClick = (entry: any) => {
    const { dataKey } = entry;
    setHiddenLines((prevLines) => ({
      ...prevLines,
      [dataKey]: !prevLines[dataKey],
    }));
  };

  const renderTooltip = (props: any): ReactNode => {
    const { active, payload } = props;

    if (active && payload) {
      return (
        <div className="custom-tooltip">
          {payload.map((entry: any) => (
            <p key={entry.name}>{`${entry.name} : ${entry.value}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip content={renderTooltip} />
        <Legend onClick={handleLegendClick} />
        <Line
          type="monotone"
          dataKey="tem"
          stroke="#8884d8"
          strokeOpacity={hiddenLines.tem ? 0 : 1}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="hum"
          stroke="#82ca9d"
          strokeOpacity={hiddenLines.hum ? 0 : 1}
        />
        <Line
          type="monotone"
          dataKey="lux"
          stroke="#ff0000"
          strokeOpacity={hiddenLines.lux ? 0 : 1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Example;
