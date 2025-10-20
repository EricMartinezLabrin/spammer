import { useState, useEffect } from 'react';
import Counter from './Counter.jsx';
import WhatsTemplate from './WhatsTemplate.jsx';
import Template from './Template.jsx';

export default function Main() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');
  const [delay, setDelay] = useState('');
  const [timeToComplete, setTimeToComplete] = useState(0);

  // Función para limpiar y procesar números de teléfono
  const handlePhoneNumbersChange = event => {
    const textValue = event.target.value;

    // Actualizar el valor del textarea para permitir edición libre
    setTextareaValue(textValue);
  };

  // Función para procesar y limpiar los números
  const processPhoneNumbers = textValue => {
    if (!textValue.trim()) {
      setPhoneNumbers([]);
      return;
    }

    // Dividir por saltos de línea y procesar cada línea
    const lines = textValue.split(/\r?\n/);

    const cleanedNumbers = lines
      .map(line => {
        // Eliminar espacios en blanco y cualquier caracter que no sea número
        return line.replace(/[^\d]/g, '');
      })
      .filter(number => {
        // Filtrar números vacíos y números que tengan menos de 7 dígitos (mínimo válido)
        return number.length >= 7;
      });

    // Actualizar el estado con los números limpios
    setPhoneNumbers(cleanedNumbers);

    // Actualizar el textarea con los números limpios
    setTextareaValue(cleanedNumbers.join('\n'));
  };

  // Efecto para limpiar automáticamente después de 1 segundo de inactividad
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (textareaValue.trim()) {
        processPhoneNumbers(textareaValue);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [textareaValue]);
  const secondsToMinutesOrHours = totalSeconds => {
    if (isNaN(totalSeconds) || totalSeconds <= 0) return '0 segundos';

    if (totalSeconds < 60) {
      return `${totalSeconds} segundos`;
    } else if (totalSeconds < 3600) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return seconds === 0
        ? `${minutes} minutos`
        : `${minutes} minutos y ${seconds} segundos`;
    } else {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      return minutes === 0
        ? `${hours} horas`
        : `${hours} horas y ${minutes} minutos`;
    }
  };

  const calculateTimeToComplete = () => {
    const delayInSeconds = parseInt(delay, 10);
    if (
      isNaN(delayInSeconds) ||
      delayInSeconds <= 0 ||
      phoneNumbers.length === 0
    ) {
      setTimeToComplete('');
      return;
    }
    const totalSeconds = phoneNumbers.length * delayInSeconds;
    setTimeToComplete(secondsToMinutesOrHours(totalSeconds));
  };

  // Efecto para recalcular el tiempo estimado cuando cambian los números o el delay
  useEffect(() => {
    calculateTimeToComplete();
  }, [phoneNumbers, delay]);

  return (
    <main className='px-40 flex justify-center flex-col items-center gap-1 pt-3'>
      <h1 className='text-3xl text-sky-600 font-semibold'>
        Envia mensajes de Whats App Masivamente
      </h1>
      <small className='text-zinc-500'>Powered by Fadetechs.com</small>
      <form className='flex flex-col gap-4 w-full' id='spam-form'>
        <label for='phone-numbers' className='h-6 text-sm'>
          Ingresar números de contacto:
        </label>
        <textarea
          id='phone-numbers'
          className='bg-white rounded-md -mt-3 text-xs focus:ring-2 focus:ring-sky-600 outline-none p-2 shadow-md'
          name='phone-numbers'
          placeholder='Pega los números de contacto aquí. Uno bajo el otro, directo desde el excel o fuente original'
          rows='5'
          cols='1'
          value={textareaValue}
          onChange={handlePhoneNumbersChange}
        ></textarea>
        <section className='flex gap-4'>
          <Counter title='Números ingresados:' count={phoneNumbers.length} />
          <Counter title='Números Aprobados:' count={phoneNumbers.length} />
        </section>
        <h2 className='text-sm'>Plantilla de WhatsApp</h2>
        <WhatsTemplate
          name={selectedTemplate?.name || ''}
          title={
            selectedTemplate?.components?.find(c => c.type === 'HEADER')
              ?.text || ''
          }
          message={
            selectedTemplate?.components?.find(c => c.type === 'BODY')?.text ||
            ''
          }
          footer={
            selectedTemplate?.components?.find(c => c.type === 'FOOTER')
              ?.text || ''
          }
          button={selectedTemplate?.category || ''}
          setShowModal={setShowModal}
        />

        <label for='intervalo' className='h-6 text-sm'>
          Frecuencia de envío de mensajes (Tiempo en segundos)
        </label>
        <input
          id='intervalo'
          type='number'
          className='-mt-2 bg-white rounded-md text-xs focus:ring-2 focus:ring-sky-600 outline-none p-2 shadow-md'
          placeholder='Ingresa el tiempo en segundos'
          onChange={e => setDelay(e.target.value)}
        />

        {timeToComplete && timeToComplete !== '' && (
          <p className='ring-1 ring-sky-600 rounded-md bg-sky-600/25 text-center text-zinc-500 text-sm p-1 shadow-md'>
            Total tiempo estimado para completar el envio:{' '}
            <span id='total-time' className='font-semibold'>
              {timeToComplete}
            </span>
          </p>
        )}

        <Template
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />

        <button
          className='bg-sky-600 text-white rounded-md p-2 shadow-md'
          type='submit'
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
