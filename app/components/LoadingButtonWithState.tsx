import { Button } from '~/components/ui/button'
import type { ButtonProps } from '~/components/ui/button'

interface LoadingButtonProps extends ButtonProps {
	state: 'idle' | 'submitting' | 'loading'
	idleText: string
	loadingText?: string
}

export default function LoadingButtonWithState({
	state,
	idleText,
	loadingText = 'Loading...',
	...props
}: LoadingButtonProps) {
	return (
		<Button disabled={state !== 'idle'} {...props}>
			{state === 'idle' ? idleText : loadingText}
		</Button>
	)
}
