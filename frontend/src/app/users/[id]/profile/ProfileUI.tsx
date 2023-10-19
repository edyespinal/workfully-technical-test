'use client'

import { useRouter } from 'next/navigation'
import { UserCheck2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/useSession'
import { User } from '@/schemas/user'

type Props = {
  user: User
}

function ProfileUI(props: Props) {
  const {
    user: { username, email, name, lastName },
  } = props

  const router = useRouter()
  const { logout } = useSession()

  const handleLogout = async () => {
    await logout()

    router.push('/auth/login')
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
      <UserCheck2Icon size={64} />
      <p className="mb-4 text-slate-600">
        You&apos;re logged in as <span className="font-bold">{username}</span>
      </p>

      <div className="mb-16 grid w-96 grid-cols-3">
        <p>Name</p>
        <span className="col-span-2 font-bold">{name}</span>

        <p>Last name</p>
        <span className="col-span-2 font-bold">{lastName}</span>

        <p>Email</p>
        <span className="col-span-2 font-bold">{email}</span>
      </div>

      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export { ProfileUI }
