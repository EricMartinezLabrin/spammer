const template = null;
const buttonText = template ? 'Cambiar' : 'Buscar';

export default function WhatsTemplate({
  name,
  title,
  message,
  footer,
  button,
  setShowModal,
}) {
  return (
    <section>
      <h2 className='text-sm'>Plantilla de WhatsApp</h2>
      <div className='flex relative'>
        <div className='bg-white rounded-l-md min-h-36 w-1/2 my-2 shadow-md'>
          <small>{name}</small>
          <h2>{title}</h2>
          <p>{message}</p>
          <small>{footer}</small>
        </div>
        <div className='bg-white rounded-r-md min-h-36 w-1/2 my-2 shadow-md relative'>
          <p>{button}</p>
          <button
            type='button'
            onClick={() => setShowModal(true)}
            className='absolute bottom-2 right-2 bg-sky-600 text-white px-2 py-1 text-xs rounded'
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
