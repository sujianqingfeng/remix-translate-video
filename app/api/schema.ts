import { createInsertSchema } from 'drizzle-zod'
import { downloads } from '~/db/schema'

export const downloadsInsertSchema = createInsertSchema(downloads)
