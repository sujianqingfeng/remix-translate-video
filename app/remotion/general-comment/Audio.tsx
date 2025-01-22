import { Audio as RemotionAudio, staticFile } from 'remotion'

interface AudioProps {
	audioPath?: string
	publicAudioPath?: string
}

export const Audio: React.FC<AudioProps> = ({ publicAudioPath }) => {
	if (!publicAudioPath) return null

	return <RemotionAudio src={staticFile(publicAudioPath)} />
}
