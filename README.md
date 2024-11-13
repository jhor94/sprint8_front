### Frontend Project - Angular, Leaflet, Chart.js, FullCalendar, Bootstrap
Este proyecto frontend está construido con Angular, Leaflet, Chart.js, FullCalendar, Bootstrap, y Toastr para interactuar con el backend y mostrar los datos en diversos componentes: gráficos, un calendario de eventos, una tabla de personas y un mapa de localizaciones. Utiliza servicios para conectar con el backend mediante HTTP y Observables, gestionando un CRUD completo.

# Tecnologías utilizadas
- Angular: Framework de desarrollo frontend para construir aplicaciones web.
- Leaflet: Librería para mostrar mapas interactivos.
- Chart.js: Librería para generar gráficos interactivos.
- FullCalendar: Librería para crear calendarios interactivos con eventos.
- Bootstrap: Framework CSS para diseño responsivo y estilización rápida.
- Toastr: Librería para mostrar notificaciones y confirmaciones de forma sencilla.
- HttpClient: Para realizar solicitudes HTTP al backend y consumir las API.
- Observable: Para gestionar flujos de datos asincrónicos con RxJS.

# Descripción de las carpetas y archivos:
/app/components: Contiene los componentes encargados de mostrar la información visualmente.

graficos.component.ts: Muestra gráficos interactivos utilizando Chart.js.
calendario.component.ts: Muestra un calendario de eventos usando FullCalendar.
localizaciones.component.ts: Muestra un mapa interactivo utilizando Leaflet y las localizaciones del backend.
personas.component.ts: Muestra una tabla con los datos de las personas obtenidos del backend.

/app/services: Contiene los servicios que se encargan de obtener y manipular los datos del backend a través de HTTP.

graficos.service.ts: Servicio para obtener los datos de los gráficos desde el backend.
calendario.service.ts: Servicio para obtener y gestionar eventos en el calendario.
localizaciones.service.ts: Servicio para obtener las localizaciones desde el backend y mostrarlas en el mapa.
personas.service.ts: Servicio que maneja el CRUD de las personas con el backend.

/app/models: Define los modelos de datos utilizados en la aplicación.

graficos.model.ts: Modelo para los datos de los gráficos.
eventos.model.ts: Modelo para los eventos del calendario.
personas.model.ts: Modelo para los datos de las personas (correspondiente al CRUD).

/app/environments: Contiene el archivo environment.ts para almacenar la URL del backend y configuraciones específicas de entorno.

/app/shared: Contiene servicios compartidos. En mi caso lo he utilizado para cargar una progrss-bar

# Instalación

- Clona este repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/tu-repositorio-frontend.git

- Instala las dependencias:

bash
Copiar código
npm install

- Ejecuta la aplicación:

bash
Copiar código
ng serve
La aplicación estará disponible en http://localhost:4200/ por defecto.

# Funcionalidades
- Gráficos interactivos: Se muestran gráficos con los datos obtenidos del backend utilizando Chart.js.
- Calendario de eventos: Se muestran los eventos en un calendario interactivo utilizando FullCalendar.
- Mapa interactivo: Utiliza Leaflet para mostrar localizaciones en un mapa basadas en los datos del backend.
- Tabla de personas: Muestra una tabla con la información de las personas, permitiendo realizar operaciones CRUD (crear, leer, actualizar y eliminar).
- Notificaciones: Se utilizan Toastr para mostrar confirmaciones de acciones realizadas (como creación, actualización o eliminación de personas).

# Conexión con el Backend
El frontend se conecta con el backend para obtener y gestionar los datos mediante los servicios. Los datos de los gráficos, eventos, personas y localizaciones se consumen a través de solicitudes HTTP utilizando Observables. Los componentes están vinculados a los servicios correspondientes que interactúan con el backend.

Este proyecto frontend integra diversas tecnologías modernas para ofrecer una solución interactiva y visualmente atractiva. Utilizando Angular, Leaflet, Chart.js, FullCalendar y Bootstrap, permite a los usuarios visualizar datos dinámicos de manera eficiente a través de gráficos, un calendario de eventos, un mapa interactivo y una tabla de personas. La conexión con el backend se maneja mediante servicios que interactúan con una API, utilizando HTTP y Observables para realizar operaciones CRUD de manera fluida. Este enfoque modular facilita la escalabilidad y mantenimiento del proyecto, mientras que las herramientas como Toastr aseguran una experiencia de usuario optimizada mediante notificaciones claras y concisas.

