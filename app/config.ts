export const commentModeOptions = [
	{
		label: 'Landscape',
		value: 'landscape',
		playerWidth: 1280,
		playerHeight: 720,
		compositionWidth: 1920,
		compositionHeight: 1080,
		compositionId: 'TranslateComment',
	},
	{
		label: 'Portrait',
		value: 'portrait',
		playerWidth: 1280,
		playerHeight: 720,
		compositionWidth: 1920,
		compositionHeight: 1080,
		compositionId: 'PortraitTranslateComment',
	},
	{
		label: 'Vertical',
		value: 'vertical',
		playerWidth: 720,
		playerHeight: 1280,
		compositionWidth: 1080,
		compositionHeight: 1920,
		compositionId: 'VerticalTranslateComment',
	},
] as const
