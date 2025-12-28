import { useState, useEffect } from 'react';
import {
  extractTemplateVariables,
  replaceTemplateVariables,
} from '../lib/utils';

export default function TemplateVariablesDialog({
  isOpen,
  template,
  onClose,
  onConfirm,
}) {
  const [variables, setVariables] = useState({});
  const [variablesList, setVariablesList] = useState([]);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isOpen && template) {
      const vars = extractTemplateVariables(template);
      setVariablesList(vars);

      // Inicializar el objeto de variables
      const initialVars = {};
      vars.forEach(varKey => {
        initialVars[varKey] = '';
      });
      setVariables(initialVars);
      setPreview(template);
    }
  }, [isOpen, template]);

  const handleVariableChange = (key, value) => {
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);

    // Actualizar preview
    const newPreview = replaceTemplateVariables(template, newVariables);
    setPreview(newPreview);
  };

  const handleConfirm = () => {
    // Validar que todas las variables tengan valor
    const allFilled = variablesList.every(key => variables[key]?.trim() !== '');
    if (!allFilled) {
      alert('Por favor, completa todas las variables.');
      return;
    }

    onConfirm(variables);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4'>
        <h2 className='text-lg font-semibold mb-4'>
          Completar variables de plantilla
        </h2>

        {variablesList.length === 0 ? (
          <p className='text-gray-600 mb-4'>
            Esta plantilla no contiene variables
          </p>
        ) : (
          <>
            <div className='space-y-3 mb-4'>
              {variablesList.map(varKey => (
                <div key={varKey}>
                  <label className='block text-sm font-medium mb-1'>
                    Variable {`{{${varKey}}}`}
                  </label>
                  <input
                    type='text'
                    value={variables[varKey] || ''}
                    onChange={e => handleVariableChange(varKey, e.target.value)}
                    placeholder={`Ingresa el valor para {{${varKey}}}`}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600'
                  />
                </div>
              ))}
            </div>

            <div className='mb-4 p-3 bg-gray-50 rounded-md'>
              <p className='text-xs font-semibold mb-2'>Vista previa:</p>
              <p className='text-xs text-gray-700 whitespace-pre-wrap'>
                {preview}
              </p>
            </div>
          </>
        )}

        <div className='flex gap-2 justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors'
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={variablesList.length === 0}
            className='px-4 py-2 bg-sky-600 text-white rounded-md text-sm hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {variablesList.length === 0 ? 'Continuar' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
