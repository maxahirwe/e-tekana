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
  - NodeJS, Express Framework
  - Sequelize, Sqlite
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

- cd in project root folder, install dependencies and run project

  ```
    - npx sequelize db:migrate
    - npm install
    - npm run dev:server
  ```

- The project contains an architectural approach to the whole intended core system (models, basic logic).

  - Use https://sqlitebrowser.org/dl/ to investigate the sqllite file

  - Models covered
    - User
    - Wallets
    - Transactions

## Documentation

- ![ERD.png](/documentation/erd.png)
- [strategy.pdf](/documentation/strategy.pdf)
- [sample sqlite db](/documentation/e-tekana.sqlite)

## Author

[@maxahirwe](https://max.rw)
