# <span style="color: #FF7900"> How to setup a .env for the template</span>

To properly run this project on your local machine, you are require to fill up the `.env` with your own local information.
There is in this folder a `.env.example` that you can use as a guide for a proper `.env` creation, but this README also will guide you through the process.

## <span style="color: #A885D8">Prisma

This project uses PrismaORM for the connection between the NestJS framework and the MySQL Database

If you need help with the setup of the database, I would recommend using the [MariaDB](https://wiki.archlinux.org/title/MariaDB) implementation for Arch Linux. On a Windows machine, maybe you'd rather let [MySQL Workbench](https://www.mysql.com/products/workbench/) do all the work for you.

The only variable this project uses for the Database connection is `DATABASE_URL` that can be set up like this:

```sh
DATABASE_URL="mysql://{USERNAME}:{PASSWORD}@{DB_ADDRESS}:{DB_PORT}/{DB_NAME}"
```

## <span style="color: #A885D8">JWT

This project uses the JWT method of authentication for it's reliability and customization potential.

It also only requires one variable by default, that is a `JWT_SECRET`. It uses this secret as a way to encrypt the token, so it's recommended to use a random very strong secret.

```sh
JWT_SECRET="{RANDOM_STRING}"
```

## <span style="color: #A885D8">Node

This last one is optional and just is the specification of which port do you want it to listen to.

It can be set up like this:

```sh
NODE_PORT=0000
```

# <span style="color: #A885D8">How can I reach you to get support with this project?

If you need help with this project or to discuss the use of one technology over another, you can email me with:

- arthur-illa@hotmail.com
