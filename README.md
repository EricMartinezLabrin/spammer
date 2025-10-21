# Spammer de WhatsApp con React

## Descripción General del Proyecto

Este proyecto es una aplicación web construida con React y Vite, diseñada para facilitar el envío masivo y automatizado de mensajes a través de WhatsApp. Su objetivo principal es proporcionar una herramienta eficiente para campañas de marketing, comunicaciones a gran escala o cualquier escenario que requiera el envío de mensajes personalizados a una lista extensa de contactos de manera controlada.

La aplicación ofrece una interfaz de usuario intuitiva que permite a los usuarios gestionar listas de números de teléfono, seleccionar plantillas de mensajes predefinidas y configurar la frecuencia de envío para evitar saturación y optimizar la entrega.

## Características Principales

*   **Gestión de Números de Teléfono:**
    *   **Entrada Flexible:** Permite ingresar números de teléfono copiando y pegando directamente desde hojas de cálculo o cualquier fuente, con cada número en una línea separada.
    *   **Limpieza y Validación Automática:** La aplicación procesa y limpia automáticamente los números ingresados, eliminando caracteres no numéricos y filtrando entradas inválidas (por ejemplo, números con menos de 7 dígitos).
    *   **Contadores en Tiempo Real:** Muestra el número total de contactos ingresados y el número de contactos válidos/aprobados.

*   **Selección y Previsualización de Plantillas de WhatsApp:**
    *   **Plantillas Reutilizables:** Permite seleccionar plantillas de mensajes de WhatsApp preconfiguradas.
    *   **Previsualización Dinámica:** Muestra una previsualización clara de cómo se verá el mensaje de la plantilla seleccionada, incluyendo encabezado, cuerpo, pie de página y botones de acción.
    *   **Fácil Intercambio:** Facilita el cambio entre diferentes plantillas con un solo clic.

*   **Control de Frecuencia de Envío:**
    *   **Intervalo Personalizable:** Los usuarios pueden definir un tiempo de espera (delay) en segundos entre el envío de cada mensaje.
    *   **Cálculo de Tiempo Estimado:** La aplicación calcula y muestra el tiempo total estimado para completar el envío de todos los mensajes, basándose en el número de contactos y el intervalo de envío configurado.

*   **Proceso de Envío Seguro y Controlado:**
    *   **Validación Pre-envío:** Realiza validaciones esenciales antes de iniciar el envío, asegurando que se hayan ingresado números, seleccionado una plantilla y definido un intervalo.
    *   **Diálogo de Autorización:** Incorpora un paso de autorización (simulado en el código actual, pero extensible para integraciones reales) antes de proceder con el envío masivo, proporcionando un resumen de la operación.
    *   **Limpieza de Formulario:** Una vez completado el proceso (o simulado), el formulario se limpia automáticamente para una nueva operación.

## Tecnologías Utilizadas

*   **React:** Biblioteca de JavaScript para construir interfaces de usuario interactivas.
*   **Vite:** Herramienta de construcción rápida para proyectos web modernos.
*   **JavaScript (ESM):** Lenguaje de programación principal.
*   **CSS:** Para estilos y diseño de la interfaz.

## Modo de Uso (Guía de Usuario)

Para utilizar la aplicación y enviar mensajes masivos de WhatsApp, sigue estos pasos:

1.  **Ingresar Números de Contacto:**
    *   En el campo de texto "Ingresar números de contacto:", pega la lista de números de teléfono a los que deseas enviar mensajes. Puedes copiarlos directamente desde una hoja de cálculo o cualquier otra fuente, asegurándote de que cada número esté en una línea separada.
    *   La aplicación limpiará y validará automáticamente los números, mostrando contadores de "Números ingresados" y "Números Aprobados".

2.  **Seleccionar Plantilla de WhatsApp:**
    *   Haz clic en el botón "Buscar" (o "Cambiar" si ya hay una seleccionada) en la sección "Plantilla de WhatsApp".
    *   Se abrirá un diálogo donde podrás elegir una de las plantillas disponibles. Selecciona la que desees utilizar para tus mensajes.
    *   La plantilla seleccionada se previsualizará en la interfaz principal, mostrando el nombre, título, mensaje, pie de página y botón de acción.

3.  **Configurar Frecuencia de Envío:**
    *   En el campo "Frecuencia de envío de mensajes (Tiempo en segundos)", ingresa el número de segundos que deseas esperar entre el envío de cada mensaje. Un valor mayor ayuda a evitar bloqueos y a gestionar la carga.
    *   La aplicación calculará y mostrará automáticamente el "Total tiempo estimado para completar el envío" basado en el número de contactos y el intervalo que hayas configurado.

4.  **Iniciar el Envío:**
    *   Una vez que hayas ingresado los números, seleccionado la plantilla y configurado la frecuencia, haz clic en el botón "Enviar".
    *   Aparecerá un "Diálogo de Autorización" que te mostrará un resumen de la operación (números totales, números aprobados, frecuencia y duración estimada).
    *   Confirma la operación en el diálogo de autorización para iniciar el proceso de envío.

5.  **Finalización:**
    *   Una vez que el proceso de envío (simulado) haya terminado, el formulario se limpiará automáticamente, listo para una nueva operación.

## Configuración del Proyecto (Instalación y Ejecución)

Este proyecto fue configurado con Vite. Para ponerlo en marcha, sigue los siguientes pasos:

### Requisitos Previos

Asegúrate de tener Node.js y pnpm instalados en tu sistema.

### Instalación

1.  Clona este repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd spammer-react
    ```
2.  Instala las dependencias del proyecto usando pnpm:
    ```bash
    pnpm install
    ```

### Ejecución en Modo Desarrollo

Para iniciar la aplicación en modo de desarrollo con recarga en caliente (HMR) usando pnpm:

```bash
pnpm dev
```

Esto iniciará un servidor de desarrollo local, generalmente accesible en `http://localhost:5173`.

### Construcción para Producción

Para construir la aplicación para producción usando pnpm:

```bash
pnpm build
```

Esto generará los archivos estáticos optimizados en el directorio `dist/`.

### Previsualización de la Construcción de Producción

Puedes previsualizar la versión de producción localmente usando pnpm:

```bash
pnpm preview
```

### Linting con ESLint

Para ejecutar ESLint y verificar problemas de código usando pnpm:

```bash
pnpm lint
```

---

**Nota:** Este template proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Babel](https://babeljs.io/) (o [oxc](https://oxc.rs) cuando se usa en [rolldown-vite](https://vite.dev/guide/rolldown)) para Fast Refresh.
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh.

### Compilador de React

El compilador de React actualmente no es compatible con SWC. Consulta [este problema](https://github.com/vitejs/vite-plugin-react/issues/428) para seguir el progreso.

### Ampliación de la configuración de ESLint

Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript con reglas de linting conscientes del tipo habilitadas. Consulta la [plantilla TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para obtener información sobre cómo integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.