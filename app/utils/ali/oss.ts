import OSS from 'ali-oss'
import invariant from 'tiny-invariant'

const ossAccessKeyId = process.env.OSS_ACCESS_KEY_ID
const ossAccessKeySecret = process.env.OSS_ACCESS_KEY_SECRET

invariant(ossAccessKeyId, 'OSS_ACCESS_KEY_ID is required')
invariant(ossAccessKeySecret, 'OSS_ACCESS_KEY_SECRET is required')

export const client = new OSS({
	bucket: 'vid-genius-hub-ap',
	region: 'oss-ap-southeast-1',
	accessKeyId: ossAccessKeyId,
	accessKeySecret: ossAccessKeySecret,
})
