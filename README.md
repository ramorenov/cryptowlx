# Proyecto Cryptowlx

CryptowlxAPI es un monitor de criptomonedas que utiliza coingecko como fuente para obtener información actualizada de las diferentes criptomonedas existentes.

Entre sus funcionalidades principales, está la creación y login de usuarios, consultar y listar información de criptomonedas disponibles en coingecko incluyendo su precio en la moneda preferida del usuario. Guardar monedas preferidas por usuario para hacer seguimiento y obtener el top N de criptomonedas según su precio en la moneda preferida del usuario.

## Comenzando 🚀

Para propósitos de desarrollo y pruebas, puedes descargar una copia del código fuente o clonar el proyecto desde este repositorio.

### Pre-requisitos 📋

Para ejecutar el proyecto necesitaras:

- NodeJS
- PostgreSQL
- Postman

### Instalación 🔧

En la terminal del sistema operativo, ubicado en la carpeta principal del proyecto CRYPTOWLX, ejecuta el comando **npm install**, para realizar la instalación de todas las dependencias requeridas.

se debe crear un archivo .env en la raíz del proyecto para colocar la variable de entorno KEY_PRIVATE que servirá como llave para encryptar la información y generar el token. eje:

KEY_PRIVATE=dafhasddfhaASFa56asg5

Deberás crear previamente una base de datos en Postgres; para configurarla deberá crear el archivo ormconfig.json en la raíz del proyecto y copiar en este archivo el siguiente array donde deberás definir las variables **_host,port,username,password y database_** para la conexión a la base de datos de desarrollo (dev) y la base de datos de testing (test), las demás variables se dejan como se muestra a continuación:

```
[
  {
    "name": "dev",
    "type": "postgres",
    "host": "YourHost",
    "port": YourPort default 5432,
    "username": "YourUser",
    "password": "YourPass",
    "database": "YourDBname",
    "entities": ["src/entities/**/*.ts"],
    "synchronize": true,
    "logging": false,
    "dropSchema" :false,
    "migrationsRun": true,
    "migrations": ["src/migrations/**/*.ts"],
    "cli": {
      "migrationsDir": "src/migrations",
      "entitiesDir": "src/entities"
    }
  },
  {
    "name": "test",
    "type": "postgres",
    "host": "YourHost",
    "port": YourPort default 5432,
    "username": "YourUser",
    "password": "YourPass",
    "database": "YourDBname",
    "entities": ["src/entities/**/*.ts"],
    "synchronize": false,
    "logging": false,
    "dropSchema": false,
    "migrations": ["src/migrations/**/*.ts"],
    "migrationsRun": false,
    "cli": {
      "migrationsDir": "src/migrations",
      "entitiesDir": "src/entities"
    }
  }
  ]
```

Una vez que la instalación ha finalizado puedes correr el proyecto con el comando **npm run dev**, por defecto se creara el servidor en el localhost:3000.

## Ejecutando las pruebas ⚙️

Para ejecutar las pruebas o test del proyecto es necesario haber completado todos los pasos de instalación del proyecto y haber configurado correctamente la base de datos "test".
Puede ejecutar los scripts para correr los test con el siguiente comando:

- npm run test

## Construido con 🛠️

- [NodeJs](https://nodejs.org/es/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [JEST](https://jestjs.io//)
- [JWT](https://jwt.io//)

## Documentación 📌

Usé [Postman](https://www.postman.com/) para ejecutar y documentar los endpoints de la API.

Puede importar la colección para postman disponible en la carpeta **postman** en la raíz del proyecto.

URL documentación:

[Postman collection doc](https://documenter.getpostman.com/view/13313578/TzsbMTN8)

## Autores ✒️

- **Ricardo Andres Moreno** - *ricardomorenoviasus@gmail.com*

## Licencia 📄

Este proyecto está bajo la Licencia (MIT)

## Agradecimientos 🎁

- 📢Gracias WLX, espero cumplir las espectativas de este challenge 😊🤓.
