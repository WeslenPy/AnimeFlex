import type { Config } from 'drizzle-kit';

export default {
  schema: './src/controller/database/schemas/*.tsx',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo', 
} satisfies Config;