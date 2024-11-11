/**
 * Generates a unique key with optional prefix
 * @param prefix - Optional prefix for the key
 * @returns A unique string key
 */
export function generateUniqueKey(prefix = ''): string {
	const timestamp = Date.now()
	const random = Math.random().toString(36).substring(2, 8)
	return `${prefix}${timestamp}-${random}`
}
