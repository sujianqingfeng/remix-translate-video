import { useNavigate } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'

export default function BackPrevious() {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return <ArrowLeft className="cursor-pointer" onClick={goBack} />
}
