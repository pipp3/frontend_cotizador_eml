import React from 'react';

const ContactView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Contacto
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Información de Contacto</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@eml.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-gray-600">+123 456 7890</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-gray-600">Avenida Principal 123</p>
                  <p className="text-gray-600">Ciudad Ejemplo, CP 12345</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Formulario de contacto */}
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Asunto de tu mensaje"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
        
        {/* Mapa */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Nuestra ubicación</h2>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center border border-gray-300">
            <p className="text-gray-600">Mapa interactivo (se integraría aquí)</p>
          </div>
        </div>
        
        {/* Horario de atención */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Horario de atención</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Lunes a Viernes</h3>
              <p className="text-gray-700">9:00 AM - 6:00 PM</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Sábados</h3>
              <p className="text-gray-700">10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView; 