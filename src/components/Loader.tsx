import { CSSProperties } from 'react';
import { ClipLoader, BeatLoader, BarLoader, PulseLoader } from 'react-spinners';

interface LoaderProps {
  type?: 'clip' | 'beat' | 'bar' | 'pulse';
  loading: boolean;
  color?: string;
  size?: number;
  fullScreen?: boolean;
  text?: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Loader = ({ 
  type = 'clip', 
  loading = true, 
  color = '#4f46e5', // Color indigo que coincide con tu tema
  size = 50,
  fullScreen = false,
  text = 'Cargando...'
}: LoaderProps) => {
  
  // Seleccionar el tipo de loader
  const renderLoader = () => {
    switch (type) {
      case 'beat':
        return <BeatLoader color={color} loading={loading} cssOverride={override} size={size/3} />;
      case 'bar':
        return <BarLoader color={color} loading={loading} cssOverride={override} width={100} />;
      case 'pulse':
        return <PulseLoader color={color} loading={loading} cssOverride={override} size={size/3} />;
      default:
        return <ClipLoader color={color} loading={loading} cssOverride={override} size={size} />;
    }
  };

  // Si es fullScreen, renderiza un loader que ocupa toda la pantalla
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
        {renderLoader()}
        {text && <p className="mt-4 text-indigo-700 font-medium">{text}</p>}
      </div>
    );
  }

  // Si no es fullScreen, renderiza solo el loader
  return (
    <div className="flex flex-col items-center py-4">
      {renderLoader()}
      {text && <p className="mt-2 text-indigo-700 text-sm">{text}</p>}
    </div>
  );
};

export default Loader; 