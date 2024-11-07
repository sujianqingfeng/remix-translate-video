/** @type {import('@remix-run/dev').AppConfig} */
export default {
	// ... 其他配置
	serverDependenciesToBundle: [/^remix-utils.*/],
	assetsBuildDirectory: 'public/build',
	publicPath: '/build/',
	serverModuleFormat: 'esm',
}
