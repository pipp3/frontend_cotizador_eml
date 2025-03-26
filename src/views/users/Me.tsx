import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/ProtectedRoute';
import { updateProfile } from '../../services/UserServices';
import { toast } from 'react-toastify';
import { UserData } from '../../types/users';

const Me: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editingField, setEditingField] = useState<keyof UserData | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authData = useAuth();

  useEffect(() => {
    if (authData) {
      setUserData({
        id: authData.id,
        nombre: authData.nombre || '',
        apellido: authData.apellido || '',
        celular: authData.celular || '',
        ciudad: authData.ciudad || ''
      });
    }
  }, [authData]);

  const handleEdit = (field: keyof UserData) => {
    setEditingField(field);
    setTempValue(String(userData?.[field] || ''));
  };

  const handleSave = async () => {
    if (!userData || !editingField) return;

    setIsLoading(true);
    try {
      const updateData: Record<string, string> = {};
      updateData[editingField] = tempValue;

      await updateProfile(updateData);
      
      setUserData(prev => ({
        ...prev!,
        [editingField]: tempValue
      }));
      
      setEditingField(null);
      toast.success('Campo actualizado correctamente', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      toast.error('Error al actualizar el campo', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderField = (field: keyof UserData, label: string) => {
    const isEditing = editingField === field;
    const value = isEditing ? tempValue : userData[field];

    return (
      <div className="group relative bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
            {isEditing ? (
              <input
                type="text"
                value={value}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
                disabled={isLoading}
              />
            ) : (
              <span className="text-gray-900">{value}</span>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:text-green-700 rounded-full hover:bg-gray-200 disabled:opacity-50"
                  title="Guardar"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-gray-200 disabled:opacity-50"
                  title="Cancelar"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEdit(field)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-primary hover:text-primary/80 rounded-full hover:bg-gray-200"
                title={`Editar ${label.toLowerCase()}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Mi Información Personal
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('nombre', 'Nombre')}
          {renderField('apellido', 'Apellido')}
          {renderField('celular', 'Celular')}
          {renderField('ciudad', 'Ciudad')}
        </div>
      </div>
    </div>
  );
};

export default Me;
