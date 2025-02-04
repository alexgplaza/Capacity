# Imagen ligera de Python basada en Alpine
FROM python:3.9-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos esenciales
COPY requirements.txt ./

# Instala dependencias sin caché para reducir tamaño
RUN apk add --no-cache gcc musl-dev libffi-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del gcc musl-dev libffi-dev  # Elimina paquetes innecesarios

# Copia el código de la aplicación
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Ejecutar la aplicación
CMD ["python", "app.py"]
