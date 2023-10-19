'use client'

import { SessionProvider } from '@/context/session'

type Props = {
  children: React.ReactNode
}

function RootProvider(props: Props) {
  const { children } = props

  return <SessionProvider>{children}</SessionProvider>
}

export { RootProvider }
