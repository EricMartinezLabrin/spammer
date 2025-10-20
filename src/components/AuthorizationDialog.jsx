import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AuthorizationDialog({
  isOpen,
  onClose,
  onAuthorize,
  summaryData,
  phoneNumbers,
  selectedTemplate,
}) {
  const [verificationCode, setVerificationCode] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  // Función para generar código aleatorio de 7 caracteres
  const generateVerificationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Función para enviar webhook
  const sendWebhook = async code => {
    try {
      const response = await fetch(
        'https://n8n.bdpyc.cl/webhook-test/7735d822-ec2f-4345-84fc-a8a1aed5db04',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            verificationCode: code,
            timestamp: new Date().toISOString(),
            message: `Recibiste este codigo ya que estan intentando enviar el mensaje un Spam de WhatsApp a ${summaryData?.totalNumbers || 0} numeros. Escribelo en Spammer para autorizar el envio.`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar webhook');
      }

      console.log('Webhook enviado exitosamente');
      return true;
    } catch (error) {
      console.error('Error enviando webhook:', error);
      return false;
    }
  };

  // Función para enviar webhook de confirmación con datos completos
  const sendConfirmationWebhook = async () => {
    try {
      // Enviar los números de teléfono como array
      const phoneNumbersList = phoneNumbers || [];

      // Preparar el template completo
      const templateData = selectedTemplate
        ? {
            name: selectedTemplate.name,
            category: selectedTemplate.category,
            language: selectedTemplate.language,
            components: selectedTemplate.components,
          }
        : null;

      const response = await fetch(
        'https://n8n.bdpyc.cl/webhook-test/4a595e21-6ba9-4af0-9afd-720c24c155e5',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumbers: phoneNumbersList,
            template: templateData,
            summary: summaryData,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar webhook de confirmación');
      }

      console.log('Webhook de confirmación enviado exitosamente');
      return true;
    } catch (error) {
      console.error('Error enviando webhook de confirmación:', error);
      return false;
    }
  };

  // Efecto para generar y enviar código cuando se abre el modal
  useEffect(() => {
    if (isOpen && !codeSent) {
      const code = generateVerificationCode();
      setStoredCode(code);
      setCodeSent(true);

      // Enviar webhook
      sendWebhook(code);
    }
  }, [isOpen, codeSent]);

  // Resetear estado cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setVerificationCode('');
      setStoredCode('');
      setCodeSent(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificar si el código ingresado coincide con el generado
      if (verificationCode.toUpperCase() === storedCode) {
        console.log('SUCCESS: Código de verificación correcto');

        // Enviar webhook de confirmación con datos completos
        const webhookSent = await sendConfirmationWebhook();

        if (webhookSent) {
          console.log('Datos enviados exitosamente al servidor');
        } else {
          console.warn(
            'Error al enviar datos al servidor, pero continuando...'
          );
        }

        await onAuthorize({ verified: true });
        onClose();
      } else {
        alert(
          'Código de verificación incorrecto. Por favor, intenta nuevamente.'
        );
      }
    } catch (error) {
      console.error('Error de autorización:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-white'>
        <DialogHeader className='text-center'>
          <div className='mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-6 h-6 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>
          <DialogTitle className='text-lg font-semibold text-gray-900 text-center'>
            Autorización Requerida
          </DialogTitle>
          <DialogDescription className='text-sm text-gray-500 '>
            Se ha enviado un código de verificación. Por favor, ingresa el
            código para continuar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
          <div className='space-y-2'>
            <Label
              htmlFor='verificationCode'
              className='text-sm font-medium text-gray-700'
            >
              Código de verificación:
            </Label>
            <Input
              id='verificationCode'
              type='text'
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              placeholder='Ingresa el código de 7 caracteres'
              className='w-full text-center font-mono text-lg tracking-wider'
              maxLength={7}
              required
            />
            <div className='text-center'>
              <span className='text-xs text-gray-400'>
                {verificationCode.length}/7 caracteres
              </span>
            </div>
          </div>

          <div className='space-y-2'>
            <Label className='text-sm font-medium text-gray-700'>
              Resumen del envío:
            </Label>
            <div className='bg-gray-50 rounded-md p-3 space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>
                  Total de números ingresados:
                </span>
                <span className='font-semibold text-gray-900'>
                  {summaryData?.totalNumbers || 0}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Total aprobados:</span>
                <span className='font-semibold text-green-600'>
                  {summaryData?.approvedNumbers || 0}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>
                  Frecuencia entre mensajes:
                </span>
                <span className='font-semibold text-gray-900'>
                  {summaryData?.frequency || 0} segundos
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Duración estimada:</span>
                <span className='font-semibold text-blue-600'>
                  {summaryData?.estimatedDuration || '0 segundos'}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col space-y-2 pt-4'>
            <Button
              type='submit'
              disabled={
                isLoading ||
                !verificationCode.trim() ||
                verificationCode.length !== 7
              }
              className='w-full bg-blue-600 hover:bg-blue-700 text-white'
            >
              {isLoading ? 'Verificando...' : 'Autorizar Ahora'}
            </Button>
            <Button
              type='button'
              onClick={handleCancel}
              variant='outline'
              className='w-full border border-gray-300 text-gray-700 hover:bg-gray-50'
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
