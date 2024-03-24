import { Sun } from 'lucide-react';

interface LuxProps {
  data: any;
}

const Lux: React.FC<LuxProps> = ({ data }) => {
  return (
    <div>
      <span className="uppercase font-bold text-white text-2xl">Light(lux)</span>
      <div className="flex mt-10 justify-between items-center">
        <span className="text-5xl font-bold text-white">
          {data?.lux || 0} lux
        </span>
        <Sun className="text-white" size={80} />
      </div>
    </div>
  );
};

export default Lux;
