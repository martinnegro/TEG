# T.E.G.

Este proyecto nació como práctica de Next JS y backend. El objetivo es recrear el clásico juego de mesa argentino Táctica y Estrategia de la Guerra (inspirado en el mundialmente famoso Risk) y está inspirado en el sitio [BGA](https://boardgamearena.com/), dónde se pueden encontrar grandes juegos de mesa, pero no el argentino T.E.G. Si bien ya existen aplicaciones y programas (ya clásicos también) que lo recrean, este proyecto tiene la intención de ser una versión web amigable y de fácil acceso, que aplique la versión *junior* del reglamento.

## Tecnologías

El proyecto está enteramente escrito en TypeScript. Utiliza NextJS para el cliente aplicando NextAuth para la autenticación y ReactBootstrap para los estilos. En cuanto al servidor, utiliza NodeJS, con Express para la API y Sequelize como ORM. La base de datos es en Postgres.

## Estado (v0.1)

Actualmente el proyecto se encuentra en estado de desarrollo, habiendose concluido el modelado de base de datos, creación e inscripción de partidas. El próximo paso es desarrollar la partida en sí, procurando una lógica sólida y que tenga la base para crear la interfaz de usuario.