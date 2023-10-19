import { request } from '@/utils/fetch'
import React, { createContext, useContext, useState } from 'react'

type User = {
  id: string
  username: string
  email: string
  name: string
  lastName: string
}

type SessionContext = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
  register: (username: string, email: string, password: string) => Promise<User>
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

export const SessionContext = createContext<SessionContext>(
  {} as SessionContext
)

export const SessionProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true)

    const res = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })

    if (res.errors) {
      setLoading(false)

      throw new Error(res.errors[0].reason)
    }

    const user = {
      id: res.id,
      username: res.username,
      email: res.email,
      name: res.name,
      lastName: res.lastName,
    }

    setUser(user)
    setLoading(false)

    return user
  }

  const login = async (email: string, password: string) => {
    setLoading(true)

    const res = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (res.errors) {
      setLoading(false)

      throw new Error(res.errors[0].reason)
    }

    const user = {
      id: res.id,
      username: res.username,
      email: res.email,
      name: res.name,
      lastName: res.lastName,
    }

    setUser(user)
    setLoading(false)

    return user
  }

  const logout = async () => {
    setLoading(true)

    await request('/api/auth/logout', {
      method: 'POST',
    })

    setUser(null)

    setLoading(false)
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
