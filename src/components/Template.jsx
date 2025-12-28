import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import WhatsTemplate from '@/components/WhatsTemplate';
import { useState, useEffect } from 'react';

export default function Template({
  setShowModal,
  showModal,
  setSelectedTemplate,
  selectedTemplate,
}) {
  const [templates, setTemplates] = useState([]);
  const [tempSelectedTemplate, setTempSelectedTemplate] = useState(null);

  const handleAddTemplate = async () => {
    try {
      const response = await fetch(
        'https://n8n.fadetechs.com/webhook/a327e28f-05bf-4ba4-a222-1a171abde6a5'
      );
      const data = await response.json();

      // Extraer las plantillas del array anidado
      const templatesData = data && data[0] && data[0].data ? data[0].data : [];

      setTemplates(templatesData);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setTemplates([]);
    }
  };

  // Cuando se abre el modal, inicializar la selección temporal con la actual
  useEffect(() => {
    if (showModal) {
      setTempSelectedTemplate(selectedTemplate);
    }
  }, [showModal, selectedTemplate]);

  useEffect(() => {
    handleAddTemplate();
  }, []);

  // Manejar el botón Aceptar
  const handleAccept = e => {
    e.preventDefault();
    if (tempSelectedTemplate) {
      setSelectedTemplate(tempSelectedTemplate);
    }
    setShowModal(false);
  };

  // Manejar el botón Volver (mantener selección anterior)
  const handleCancel = () => {
    setTempSelectedTemplate(selectedTemplate);
    setShowModal(false);
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={open => {
        if (!open) {
          handleCancel();
        }
      }}
    >
      <form>
        <DialogContent className='w-3/4 flex flex-col max-h-[80vh]'>
          <DialogHeader className='items-center'>
            <DialogTitle>
              <img src='/svg/open.svg' alt='Open' className='w-9' />
            </DialogTitle>
            <DialogDescription className='text-lg font-semibold text-zinc-800'>
              Plantillas de Whats App
            </DialogDescription>
          </DialogHeader>
          <div className='overflow-y-auto flex-1 pr-4'>
            {Array.isArray(templates) &&
              templates.length > 0 &&
              templates.map((template, index) => {
                // Extraer componentes de la plantilla
                const headerComponent = template.components?.find(
                  c => c.type === 'HEADER'
                );
                const bodyComponent = template.components?.find(
                  c => c.type === 'BODY'
                );
                const footerComponent = template.components?.find(
                  c => c.type === 'FOOTER'
                );

                return (
                  <WhatsTemplate
                    key={template.id || index}
                    name={template.name || ''}
                    title={headerComponent?.text || ''}
                    message={bodyComponent?.text || ''}
                    footer={footerComponent?.text || ''}
                    button={template.category || ''}
                    setShowModal={setShowModal}
                    onClick={() => setTempSelectedTemplate(template)}
                    isSelected={
                      tempSelectedTemplate &&
                      tempSelectedTemplate.id === template.id
                    }
                    showButton={false}
                  />
                );
              })}
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              className='bg-zinc-200 w-1/2 text-zinc-800 hover:text-white'
              onClick={handleCancel}
              type='button'
            >
              Volver
            </Button>
            <Button
              type='submit'
              className='bg-sky-600 w-1/2'
              onClick={handleAccept}
            >
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
