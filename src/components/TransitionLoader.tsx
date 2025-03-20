import { useEffect, useState } from 'react';
import { useNavigation, useLocation } from 'react-router-dom';
import Loader from './Loader';

const TransitionLoader = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  
  // Cuando cambia el estado de navegación o la ubicación
  useEffect(() => {
    // Solo mostrar el loader cuando estamos en estado de carga, no durante submitting
    if (navigation.state === "loading") {
      setShowLoader(true);
    } else {
      // Pequeño retraso para que la transición se vea más suave
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [navigation.state, location]);
  
  // Si no estamos cargando, no mostrar nada
  if (!showLoader) return null;
  
  return (
    <Loader 
      fullScreen={true} 
      text="Cargando página..." 
      type="pulse"
      loading={true}
    />
  );
};

export default TransitionLoader; 