# Administración de Proyectos 2 - Frontend

## Ejecutar en local

Para lograr esto, es fundamental que tengas instalado:

- Node v18.3.0
- Npm v8.11.0

Una vez logrado esto, realiza los siguientes pasos:

1. Agrega un archivo `.env` en la carpeta raíz del proyecto que contenga los datos correctos de ejecución (utiliza de guía el archivo `.env.example`).
2. Abre una terminal dentro de la carpeta de este proyecto.
3. Instala las dependencias: `npm i`.
4. Ejecuta el proyecto en modo desarrollo: `npm run dev`.
5. Accede a la [página principal](http://localhost:5173/).

En este escenario, cada que hagas un cambio se verá reflejado en la página.

## Ejecutar con Docker

1. Agrega un archivo `.env` en la carpeta raíz del proyecto que contenga los datos correctos de ejecución (utiliza de guía el archivo `.env.example`).
2. Asegúrate de que tu Docker se encuentre en ejecución.
3. Abre una terminal dentro de la carpeta de este proyecto.
4. Elimina el último contenedor que creaste de este proyecto: `docker rm -f Admin2-Frontend`.
5. Elimina la última imagen que creaste de este proyecto: `docker rmi -f admin2-frontend-image`.
6. Genera una nueva versión del proyecto compilado: `docker-compose up -d`.
7. Accede a la [página principal](http://localhost:80/).

En este escenario, el proyecto se compila y se despliega utilizando un servidor en Docker, por lo que, si deseas probar una versión diferente deberás compilarlo de nuevo.
