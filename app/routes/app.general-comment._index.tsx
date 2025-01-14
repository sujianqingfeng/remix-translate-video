import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'

export const loader = async () => {
	return {
		comments: [],
	}
}

export default function AppGeneralCommentIndex() {
	return (
		<div>
			<Link to="/app/general-comment/create">
				<Button>Create</Button>
			</Link>
		</div>
	)
}
