# pm_tournomaster

This project consists of a front-end built with **Angular** and a back-end built with **NestJS**, with an integrated **SQLite database** for data persistence.

## Overview

### Front-End

The front-end application has four main pages:

-   **Scores Consultation**: View the results of matches.
-   **Teams Management**: Manage teams.
-   **Scores Management**: Manage scores.
-   **Login**: User authentication.

### Back-End

The back-end application provides three main services with REST APIs:

-   **Auth Service**: Handles user authentication with JWT.
-   **Matches Service**: Manages match data, including creation, updates, and retrieval. It also includes a WebSocket for triggering client refreshes when matches are updated or created.
-   **Teams Service**: Manages team data, including creation and retrieval.

### Documentation

You can access the CHANGELOG files for detailed changes and updates:

-   [API CHANGELOG.md](./api/CHANGELOG.md)
-   [App CHANGELOG.md](./app/CHANGELOG.md)

#### API Documentation

After starting the application, the Swagger API documentation is available at [http://localhost:3000/docs](http://localhost:3000/docs) and the OpenAPI schema is available at [http://localhost:3000/open-api](http://localhost:3000/open-api).

## Quickstart

### Clone the repository

Clone the repository:

```bash
git clone https://github.com/fdesseengrand/pm_tournomaster.git
cd pm_tournomaster
```

### Running the project with Docker Compose

This project includes a Docker setup for easy development and deployment. The `docker-compose.yml` file defines two services: `api` and `app`. The Dockerfile for each is in their respective directories.

#### Requirements

Deployment of the application requires Docker version `20.10` or higher, or a separate installation of Docker Compose.

You can verify installations by running:

```bash
docker --version
docker compose version
```

#### Execution

To build and start the services, run:

```bash
docker-compose up --build
```

### Running the project locally

#### Prerequisites

-   The NestJS application requires Node.js >= 16.
-   The Angular application requires Node.js in version `^18.19.1 || ^20.11.1 || ^22.0.0`.
-   Make sure you have npm installed in a recent version.

#### API Services

Open a command prompt at the root of the project and execute the following steps:

```bash
# Install NestJS CLI.
npm i -g @nestjs/cli
cd api
# Install dependencies.
npm install
# Launch the project locally (development mode).
npm run start
```

Refer to the `scripts` section of the `api/package.json` file for alternative startups (watch mode, debug, tests).

The service will be available at `localhost:3000`, e.g. `localhost:3000/matches` to fetch matches or `localhost:3000/docs` to consult the Swagger.

#### Front application

Open a command prompt at the root of the project and execute the following steps:

```bash
# Install Angular CLI.
npm install -g @angular/cli
cd app
# Install dependencies.
npm install
# Launch the project locally (development mode).
ng serve
```
