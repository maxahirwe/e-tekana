[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# TEKANA E-WALLET

## Features breakdown

    - User Registration
    - Wallets
      - Multiple Wallets & Currency Support
    - Transaction

## Architecture

- [ERD](https://dbdiagram.io/d/63a9ad957d39e42284e79027)
- Technologies
  - Server: NodeJS, Express Framework
  - Database: Sequelize, Sqlite
  - Style: REST architectural style
- [END-POINTS DOCUMENTATION PUBLISHED](https://documenter.getpostman.com/view/16879881/2s8Z6x1svV)
- [END-POINTS DOCUMENTATION (POSTMAN)](https://universal-capsule-39502.postman.co/workspace/5975be7f-a315-4934-bca2-1c2b1e9ea2cc/collection/16879881-25cb84be-ecd5-4663-9d01-76cde98e1b1e?action=share&creator=16879881)

## Setup

- Install latest node version https://nodejs.org/en/download/ (Used v16.0.0+)
- In root folder create a `.env` file with the following details/credentials

```
    DATABASE_NAME=./e-tekana.sqlite
    DB_USERNAME=sample
    DB_PASSWORD=sample
    DB_HOST=./e-tekana.sqlite
    DB_DRIVER=sqlite
    SWAGGER_BASE_URL=
    PORT=3000
    TZ=Africa/Kigali
    EXPIRE_TIME=10d
    SECRET=sampleSecret
    SMTP_HOST=
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASSWORD=
    FRONT_END_BASE_URL=
```

- cd in project root folder, install dependencies, create & seed db and run server

  ```
    npm install
  ```

  ```
    npm run dev:db-setup
  ```

  ```
    npm run dev:server
  ```

- for testing/development purpose the following user is seeded into the db

  ```
     email: 'user@sample.rw',
     phone: '+250788536943',
     password: test12345
  ```

- The project contains an architectural approach to the whole intended core system (models, basic logic).

  - Use https://sqlitebrowser.org/dl/ to investigate the sqllite file

  - Models covered
    - User
    - Wallets
    - Transactions

### Sample User Journey

    1. User Signup => POST -> http://localhost:3000/api/auth/register
    2. User Confirm Account => POST -> http://localhost:3000/api/auth/confirm
    3. User Create Wallet => POST -> http://localhost:3000/api/wallet/create
    4. User Get Wallets => GET -> http://localhost:3000/api/wallet/
    5. User Create Transaction => POST -> http://localhost:3000/api/transaction/create
    6. Uset Get Transactions => POST -> http://localhost:3000/api/transaction/

## Documentation

- ![ERD.png](/documentation/erd.png)
- ![strategy-page 1](/documentation/strategy-page1.jpg)
- ![strategy-page 2](/documentation/strategy-page2.jpg)
- [strategy.pdf](/documentation/strategy.pdf)
- [sample sqlite db](/documentation/e-tekana.sqlite)

## Author

[@maxahirwe](https://max.rw)
