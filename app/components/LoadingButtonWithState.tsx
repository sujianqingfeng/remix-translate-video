import { Loader2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { ButtonProps } from '~/components/ui/button'

interface LoadingButtonProps extends ButtonProps {
	state: 'idle' | 'submitting' | 'loading'
	idleText: string
	loadingText?: string
	icon?: React.ReactNode
}

export default function LoadingButtonWithState({ state, idleText, loadingText = 'Loading...', icon, ...props }: LoadingButtonProps) {
	return (
		<Button disabled={state !== 'idle'} {...props}>
			{state === 'idle' ? (
				<>
					{icon}
					{idleText}
				</>
			) : (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{loadingText}
				</>
			)}
		</Button>
	)
}
