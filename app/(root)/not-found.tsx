import { Container } from '@/components/shared'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Container className="mt-10 flex flex-col items-center">
            <h2 className='text-3xl'>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className='text-primary' href="/">Return Home</Link>
        </Container>
    )
}