import { defineConfig } from '@prisma/client/config';

export default defineConfig({
  datasource: {
    adapter: 'postgresql',
    url: process.env.DATABASE_URL,
  },
});
