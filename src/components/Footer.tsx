import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-6 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Listador de Productos</h3>
            <p className="text-blue-100">Tu solución para gestionar productos de manera eficiente.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-100 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/productos" className="text-blue-100 hover:text-white transition-colors">Productos</a></li>
              <li><a href="/contacto" className="text-blue-100 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Contacto</h3>
            <address className="text-blue-100 not-italic">
              <p>Email: info@listador.com</p>
              <p>Teléfono: +123 456 7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-6 pt-6 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Listador de Productos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 