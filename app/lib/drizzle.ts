import { drizzle } from 'drizzle-orm/libsql'
import { DB_FILE_NAME } from '~/constants'
import * as schema from '~/db/schema'

if (!DB_FILE_NAME) {
	throw new Error('db file not fount')
}

export const db = drizzle(DB_FILE_NAME, { schema })

export { schema }
