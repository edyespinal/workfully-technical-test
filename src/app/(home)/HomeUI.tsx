import Link from 'next/link'

import { Button } from '@/components/ui/button'

type Props = {
  user: any
  handleLogout: any
}

function HomeUI(props: Props) {
  const { user, handleLogout } = props

  return (
    <main className="pt-24">
      <div className="py-8">
        <h1 className="text-4xl font-bold">Workfully</h1>
        <p>This is the frontend for the technical test</p>
      </div>

      <div className="flex gap-8">
        {user ? (
          <>
            <Link href={`/users/${user.id}/profile`}>
              <Button>My Profile</Button>
            </Link>

            <Button onClick={handleLogout}>Log out</Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>

            <Link href="/auth/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

export { HomeUI }
