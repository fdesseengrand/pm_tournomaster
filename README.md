# pm_tournomaster

This is a responsive application for consulting and managing sports competitions.

A [developpement logbook](./LOGBOOK.md) briefly presents the architecture, the stages of reflection and areas for improvement.

You can access the CHANGELOG files for detailed changes and updates:

-   [API CHANGELOG.md](./api/CHANGELOG.md)
-   [APP CHANGELOG.md](./app/CHANGELOG.md)

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

Once the application is running, you can access :
- The client at `localhost:4200`.
- The API at `localhost:3000`.
- The Swagger API documentation is available at [http://localhost:3000/docs](http://localhost:3000/docs) and the OpenAPI schema is available at [http://localhost:3000/open-api](http://localhost:3000/open-api).

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
