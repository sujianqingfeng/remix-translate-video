export const formatLikes = (count: number) => {
	if (count >= 10000) {
		return `${(count / 10000).toFixed(1)}w`
	}
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`
	}
	return count.toString()
}
