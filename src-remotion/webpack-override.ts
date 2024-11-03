import { WebpackOverrideFn } from '@remotion/bundler'
import { enableTailwind } from '@remotion/tailwind'

export const webpackOverride: WebpackOverrideFn = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentConfiguration: any
) => {
  return {
    ...enableTailwind(currentConfiguration)
  }
}
