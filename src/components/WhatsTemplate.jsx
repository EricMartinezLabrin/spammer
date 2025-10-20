export default function WhatsTemplate({
  name,
  title,
  message,
  footer,
  button,
  setShowModal,
  onClick,
  isSelected,
  showButton = true,
}) {
  const handleTemplateClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Si no hay contenido, mostrar mensaje de placeholder
  const hasContent = name || title || message || footer || button;
  const buttonText = hasContent ? 'Cambiar' : 'Buscar';

  return (
    <section>
      <div
        className={`flex relative transition-all duration-200 ${
          onClick ? 'cursor-pointer' : ''
        } ${isSelected ? '' : onClick ? 'hover:bg-gray-50' : ''}`}
        onClick={handleTemplateClick}
      >
        <div
          className={`bg-white rounded-l-md min-h-36 w-1/2 my-2 shadow-md p-3 ${
            isSelected ? 'border-l-4 border-sky-500' : ''
          }`}
        >
          {hasContent ? (
            <>
              {name && (
                <small>
                  Nombre de Plantilla:{' '}
                  <span className='font-semibold'>{name}</span>
                </small>
              )}
              {title && <h2 className='font-semibold'>{title}</h2>}
              {message && <p>{message}</p>}
              {footer && <small>{footer}</small>}
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-gray-400'>
              <p className='text-sm'>No hay plantilla seleccionada</p>
              <p className='text-xs'>
                Haz clic en "Buscar" para seleccionar una
              </p>
            </div>
          )}
        </div>
        <div
          className={`bg-white rounded-r-md min-h-36 w-1/2 my-2 shadow-md relative p-3 ${
            isSelected ? 'border-r-4 border-sky-500' : ''
          }`}
        >
          {button && <p>{button}</p>}
          {showButton && (
            <button
              type='button'
              onClick={e => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className='absolute bottom-2 right-2 bg-sky-600 text-white px-2 py-1 text-xs rounded hover:bg-sky-700 transition-colors'
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
