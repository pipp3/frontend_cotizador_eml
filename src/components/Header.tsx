import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../services/AuthServices';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await LogoutUser();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Error al cerrar sesion: ", error);
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Listador de Productos</h1>
        <div className="flex items-center space-x-4">
          <nav className="flex space-x-4">
            <a href="/" className="hover:text-blue-200 transition-colors">Inicio</a>
            <a href="/productos" className="hover:text-blue-200 transition-colors">Productos</a>
            <a href="/contacto" className="hover:text-blue-200 transition-colors">Contacto</a>
          </nav>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-transparent hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Mi Cuenta
              <svg className={`ml-2 h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-10 border border-gray-100">
                <a 
                  href="/perfil" 
                  className=" px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Mi Perfil
                </a>
                <button 
                  onClick={handleLogout}
                  className=" w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm4.5 7a.5.5 0 000 1h5a.5.5 0 000-1h-5z" clipRule="evenodd" />
                    <path d="M16 8a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1z" />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 