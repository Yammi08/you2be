# you2be
este es un proyecto con proposito educativo personal.
se usaron herramientas como `ffmpeg` el cual para el uso se uso librerias como `ffmpeg-static` y `ffprobe-static`, esta se encarga de convertir los videos a webm( con codec de video vp9 y el audio opus) y crea guarda el primer frame de cada video en formato webp.
## funciones
este proyecto cuenta con:
1. un conversor de videos mp4 a webm usando `ffmepg` .
2. captura de frames para su posterior convercion a `webp`.
3. encriptacion de contraseñas usando `bcryptjs
4. El porcentaje de avance de la conversión se calcula comparando la cantidad de fotogramas ya procesados con el total estimado.
5. un buscador sencillo el cual busca por coincidencias respecto al nombre.
## instalacion
```
git clone git@github.com:Yammi08/you2be.git
npm install
npm run dev # para iniciar en modo desarrollador
```
