import { ThermometerSun } from 'lucide-react';
interface TemperatureProps {
  data: any;
}

const Temperature: React.FC<TemperatureProps> = ({ data }) => {
  return (
    <div>
      <span className="uppercase font-bold text-white text-2xl">
        Temperature(℃)
      </span>
      <div className="flex mt-10 justify-between items-center">
        <span className="text-5xl font-bold text-white">
          {data?.tem || 0} ℃
        </span>
        <ThermometerSun className="text-white" size={80} />
      </div>
    </div>
  );
};

export default Temperature;
