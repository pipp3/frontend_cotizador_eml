import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './ProtectedRoute';

const Footer: React.FC = () => {
  const userData = useAuth();
  const isAdmin = userData ? userData.rol === 'admin' : false;

  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-6 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Cotizador EML</h3>
            <p className="text-blue-100">Tu solución para gestionar productos y pedidos de manera eficiente.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/productos" className="text-blue-100 hover:text-white transition-colors">Productos</Link></li>
              <li><Link to="/pedidos" className="text-blue-100 hover:text-white transition-colors">Mis Pedidos</Link></li>
              <li><Link to="/perfil" className="text-blue-100 hover:text-white transition-colors">Mi Perfil</Link></li>
              <li><Link to="/carrito" className="text-blue-100 hover:text-white transition-colors">Carrito</Link></li>
              <li><Link to="/contacto" className="text-blue-100 hover:text-white transition-colors">Contacto</Link></li>
              {isAdmin && (
                <>
                  <li><Link to="/productos-admin" className="text-blue-100 hover:text-white transition-colors">Administrar Productos</Link></li>
                  <li><Link to="/pedidos-admin" className="text-blue-100 hover:text-white transition-colors">Administrar Pedidos</Link></li>
                  <li><Link to="/administrar-usuarios" className="text-blue-100 hover:text-white transition-colors">Administrar Usuarios</Link></li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Contacto</h3>
            <address className="text-blue-100 not-italic">
              <p>Email: info@eml.com</p>
              <p>Teléfono: +123 456 7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-6 pt-6 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Cotizador EML. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 