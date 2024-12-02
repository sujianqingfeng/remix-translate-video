import type { WebpackOverrideFn } from '@remotion/bundler'
import { enableTailwind } from '@remotion/tailwind'

export const webpackOverride: WebpackOverrideFn = (currentConfiguration: any) => {
	return {
		...enableTailwind(currentConfiguration),
	}
}
