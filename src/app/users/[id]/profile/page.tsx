import { request } from '@/utils/fetch'
import { ProfileUI } from './ProfileUI'
import { cookies } from 'next/headers'
import { ShieldBan } from 'lucide-react'
import { User } from '@/schemas/user'

type Props = {
  params: { id: string }
}

async function ProfilePage(props: Props) {
  const { params } = props

  let user: User | null = null

  try {
    const response = await request(`/api/users/${params.id}/profile`, {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join('; '),
      },
    })

    user = response
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    return (
      <div className="py-8">
        <ShieldBan size={64} />
        <h1 className="mt-4 text-2xl font-bold">Unauthorized</h1>
        <p>Sorry, but you cannot access this information</p>
      </div>
    )
  }

  return <ProfileUI user={user} />
}

export default ProfilePage
