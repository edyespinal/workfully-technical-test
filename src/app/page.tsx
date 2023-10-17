import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='p-24'>
      <header className='py-8'>
        <h1 className='text-4xl font-bold'>Workfully</h1>
        <p>This is the frontend for the technical test</p>
      </header>

      <div className='flex gap-8'>
        <Link href='/auth/login'>
          <Button>Login</Button>
        </Link>

        <Link href='/auth/register'>
          <Button>Register</Button>
        </Link>
      </div>
    </main>
  )
}
