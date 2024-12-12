import { defineConfig } from 'drizzle-kit'

const dbUrl = process.env.DB_FILE_NAME

if (!dbUrl) {
	throw new Error('db file not fount')
}

export default defineConfig({
	out: './drizzle',
	schema: './app/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: dbUrl,
	},
})
