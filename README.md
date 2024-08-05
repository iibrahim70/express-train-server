# Train Service Management System

## Overview

The Train Service Management System is a backend application designed to handle train services, user management, wallet integration, and ticketing. Built with Node.js, Express, and TypeScript, this system uses MongoDB and Mongoose for data persistence. It supports user authentication, station and train management, wallet transactions, and ticket purchases. The project follows a modular architecture for maintainability and scalability.

## Features

- _User Management_: Register, log in, and manage users with JWT authentication and password hashing using bcrypt.
- _Station Management_: Create, update, and retrieve station information.
- _Train Management_: Manage train schedules, including stops and timings.

- _Wallet Integration_: Add funds, check balance, and maintain transaction history.
- _Ticketing System_: Purchase tickets with wallet balance, calculate fares based on train stops.

## Technologies

- _Node.js_: JavaScript runtime for building scalable server-side applications.
- _Express_: Web framework for Node.js to build RESTful APIs.
- _TypeScript_: Adds static types to JavaScript, improving code quality and maintainability.
- _MongoDB_: NoSQL database for flexible and scalable data storage.

- _Mongoose_: ODM library for MongoDB to simplify data modeling and validation.
- _Prettier_: Code formatter to ensure consistent code style.
- _ESLint_: Linter to identify and fix problems in the code.

## Project Setup

1. _Clone the Repository_

```bash
git clone https://github.com/iibrahim70/express-train-server.git
cd express-train-server
```

2. _Install Dependencies_

```bash
pnpm i
```

3. _Configuration_

   Create a .env file in the root directory with the following environment variables:

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=yourMongoDbDatabaseUrl/ //forward_slash_is_required
COLLECTION_NAME=yourCollectionName
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET=yourJwtAccessSecret
JWT_EXPIRES_IN=1h
```

4. _Build the Project_

```bash
pnpm start
```

5. _Run the Project_

```bash
pnpm start:dev
```

## Endpoints

### User Management

- _POST api/v1/users/register_: Register a new user.

- _POST api/v1/users/login_: Log in an existing user.

### Station Management

- _GET /api/v1/stations_: Retrieve stations information.
- _GET /api/v1/stations/:stationId_: Retrieve station information.

- _POST /api/v1/stations/create-station_: Create a new station.
- _PATCH /api/v1/stations/update-station/:stationId_: Update station information.

### Train Management

- _GET /api/v1/trains/_: Retrieve trains schedule information.
- _GET /api/v1/trains/:trainId_: Retrieve train schedule information.

- _POST /api/v1/trains/create-train_: Create a new train schedule.
- _PATCH /api/v1/trains/update-train:trainId_: Update train schedule information.

### Wallet Integration

- _GET /api/v1/wallets_: Retrieve the user's wallet balance.

- _POST /api/v1/wallets/add-funds_: Add funds to the user's wallet.

### Ticketing System

- _POST /api/v1/tickets/calculate-price_: Calculate the price of a ticket based on provided details.

- _POST /api/v1/tickets/purchase_: Purchase a ticket using wallet balance.

## Code Quality

- _Prettier_: Code formatting rules are enforced by Prettier.
- _ESLint_: Linting rules are enforced by ESLint.

- _TypeScript_: Adds static types to JavaScript, improving code quality and maintainability.

## Contact

For any questions or issues, please reach out to [Click Here](mailto:iibrahiim.dev@gmail.com).

---
