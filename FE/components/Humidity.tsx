import { Droplets } from 'lucide-react';

interface HumidityProps {
  data: any;
}

const Humidity: React.FC<HumidityProps> = ({ data }) => {
  return (
    <div>
      <span className="uppercase font-bold text-white text-2xl">
        Humidity(%)
      </span>
      <div className="flex mt-10 justify-between items-center">
        <span className="text-5xl font-bold text-white">
          {data?.hum || 0} %
        </span>
        <Droplets className="text-white" size={80} />
      </div>
    </div>
  );
};

export default Humidity;
