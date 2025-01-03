export async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms))
}

// 添加并发控制函数
export async function asyncPool<T, U>(poolLimit: number, items: T[], iteratorFn: (item: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
	const ret: Promise<U>[] = []
	const executing = new Set<Promise<U>>()

	for (let i = 0; i < items.length; i++) {
		const p = Promise.resolve().then(() => iteratorFn(items[i], i, items))
		ret.push(p)
		executing.add(p)

		const clean = () => executing.delete(p)
		p.then(clean).catch(clean)

		if (executing.size >= poolLimit) {
			await Promise.race(executing)
		}
	}
	return Promise.all(ret)
}

export function getAmountText(amount?: number) {
	if (!amount) {
		return ''
	}
	if (amount >= 1000000000) {
		return `${(amount / 1000000000).toFixed(1)}B`
	}
	if (amount >= 1000000) {
		return `${(amount / 1000000).toFixed(1)}M`
	}
	if (amount >= 1000) {
		return `${(amount / 1000).toFixed(1)}K`
	}
	return amount.toString()
}
