## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This project is a small API created for the Genesis Software Engineering School 4.0. It's written using Node.js. It uses NestJs as a web framework. This project is dockerized (it includes Dockerfile, docker-compose.yml, and Makefile).

## Technologies

Project is created with:

- Node.js
- Typescript
- NestJs
- CurrencyBeacon (for currency exchange rates)

## Setup

Create .env file from the example.env (and set env variables in newly created file). The default values for database are provided in example.env. As for the API key for CurrencyBeacon, you need to get one ([see here](https://currencybeacon.com/)).

```
$ cp example.env .env
```

Run following command to build and start the web server and database inside docker (database will be created automatically, along with tables):

```
$ make up
```

---

Run following command to stop running web server inside docker:

```
$ make down
```

Notes:

- If make scripts doesn't work, you might need to adjust Makefile and switch to `docker-compose` instead of `docker compose`;
- I didn't have time to implement emails feature :c
