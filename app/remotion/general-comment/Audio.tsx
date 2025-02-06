import { Audio as RemotionAudio, staticFile } from 'remotion'

interface AudioProps {
	audioPath?: string
	publicAudioPath?: string
}

export const Audio: React.FC<AudioProps> = ({ publicAudioPath }) => {
	if (!publicAudioPath) return null

	// 移除开头的斜杠和 public/，因为 staticFile 会自动从 public 目录加载
	const normalizedPath = publicAudioPath
		.replace(/^\//, '') // 移除开头的斜杠
		.replace(/^public\//, '') // 移除 public/ 前缀

	return <RemotionAudio loop src={staticFile(normalizedPath)} volume={0.1} />
}
