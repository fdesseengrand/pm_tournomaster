# pm_tournomaster

## Overview

// TODO : architecture, Swagger, dependencies.

## Quickstart

### Clone the repository

Clone the repository:

```bash
git clone https://github.com/fdesseengrand/pm_tournomaster.git
cd pm_tournomaster
```

### Set up environment variables

The `api` project needs environment variables.
Create a `.env` file in the `api` repository and add the following line :

```bash
JWT_SECRET=your_secret_key_here
```

Replace `your_secret_key_here` with a strong, unique secret key.

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

- The NestJS application requires Node.js >= 16.
- The Angular application requires Node.js in version	`^18.19.1 || ^20.11.1 || ^22.0.0`.
- Make sure you have npm installed in a recent version.

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
