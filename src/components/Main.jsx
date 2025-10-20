import { useState } from 'react';
import Counter from './Counter.jsx';
import WhatsTemplate from './WhatsTemplate.jsx';
import Template from './Template.jsx';

export default function Main() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  return (
    <main className='px-40 flex justify-center flex-col items-center gap-1 pt-3'>
      <h1 className='text-3xl text-sky-600 font-semibold'>Spammer</h1>
      <small className='text-zinc-500'>Powered by Fadetechs.com</small>
      <form className='flex flex-col gap-4 w-full' id='spam-form'>
        <label for='phone-numbers' className='h-6 text-sm'>
          Ingresar números de contacto:
        </label>
        <textarea
          id='phone-numbers'
          className='bg-white rounded-md -mt-3 text-xs focus:ring-2 focus:ring-sky-600 outline-none p-2 shadow-md'
          name='phone-numbers'
          placeholder='Pega los números de contacto aquí.'
          rows='5'
          cols='1'
        ></textarea>
        <section className='flex gap-4'>
          <Counter title='Números ingresados:' id='number-counter' />
          <Counter title='Números Aprobados:' id='number-approved' />
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
          type='text'
          className='-mt-2 bg-white rounded-md text-xs focus:ring-2 focus:ring-sky-600 outline-none p-2 shadow-md'
          placeholder='Ingresa el tiempo en segundos'
        />

        <p className='ring-1 ring-sky-600 rounded-md bg-sky-600/25 text-center text-zinc-500 text-sm p-1 shadow-md'>
          Total tiempo estimado para completar el envio:{' '}
          <span id='total-time' className='font-semibold'>
            60 segundos
          </span>
        </p>

        <Template
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      </form>
    </main>
  );
}
