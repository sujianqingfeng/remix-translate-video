import fsp from 'node:fs/promises'

export async function fileExist(path: string) {
	return await fsp.access(path).then(
		() => true,
		() => false,
	)
}

export async function createFileCache<
	T extends
		| string
		| Record<string, unknown>
		| Record<string, unknown>[] = string,
>({
	path,
	generator,
	isJsonTransform = false,
}: {
	path: string
	generator: () => Promise<T>
	isJsonTransform?: boolean
}): Promise<T> {
	const fileExists = await fileExist(path)

	if (fileExists) {
		const str = await fsp.readFile(path, 'utf-8')
		return isJsonTransform ? JSON.parse(str) : str
	}

	const str = await generator()
	const strToWrite = isJsonTransform ? JSON.stringify(str, null, 2) : str

	if (typeof strToWrite !== 'string') {
		throw new Error('strToWrite is not a string')
	}

	await fsp.writeFile(path, strToWrite)

	return str
}
