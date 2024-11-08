import { Config } from '@remotion/cli/config'
import { webpackOverride } from './app/remotion/webpack-override'

Config.overrideWebpackConfig(webpackOverride)
