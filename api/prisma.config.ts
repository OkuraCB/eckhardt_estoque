import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: `mysql://${env("DATABASE_USER")}:${env("DATABASE_PASSWORD")}@${env("DATABASE_HOST")}:3306/${env("DATABASE_NAME")}`,
  },
});