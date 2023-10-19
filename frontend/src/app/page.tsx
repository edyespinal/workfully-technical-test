'use client'

import { useRouter } from 'next/navigation'

import { useSession } from '@/hooks/useSession'
import { HomeUI } from './(home)/HomeUI'

export default function Home() {
  const { user, logout } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()

    router.push('/auth/login')
  }

  return <HomeUI {...{ user, handleLogout }} />
}
