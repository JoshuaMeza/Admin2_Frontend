# Utiliza una imagen base de Node para construir la aplicación
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el .env
COPY .env.example .env

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación React
RUN npm run build

# Copia el archivo de configuración de Nginx personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cambia a la imagen de Nginx estable para el despliegue
FROM nginx:stable-alpine

# Copia la aplicación React construida desde la etapa anterior
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expone el puerto
EXPOSE 80
