# Administración de Proyectos 2 - Frontend

## Ejecutar en local

Para lograr esto, es fundamental que tengas instalado:

- Node v18.3.0
- Npm v8.11.0

Una vez logrado esto, realiza los siguientes pasos:

1. Abre una terminal dentro de la carpeta de este proyecto.
2. Instala las dependencias: `npm i`.
3. Ejecuta el proyecto en modo desarrollo: `npm run dev`.
4. Accede a la [página principal](http://localhost:5173/).

En este escenario, cada que hagas un cambio se verá reflejado en la página.

## Ejecutar con Docker

1. Asegúrate de que tu Docker se encuentre en ejecución.
2. Abre una terminal dentro de la carpeta de este proyecto.
3. Elimina el último contenedor que creaste de este proyecto: `docker rm -f Admin2-Frontend`.
4. Elimina la última imagen que creaste de este proyecto: `docker rmi -f admin2-frontend-image`.
5. Genera una nueva versión del proyecto compilado: `docker-compose up -d`.
6. Accede a la [página principal](http://localhost:80/).

En este escenario, el proyecto se compila y se despliega utilizando un servidor en Docker, por lo que, si deseas probar una versión diferente deberás compilarlo de nuevo.
