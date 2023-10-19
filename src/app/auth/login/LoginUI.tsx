'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

type Props = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  error?: string
  loading: boolean
}

function LoginUI(props: Props) {
  const { handleOnChange, handleOnSubmit, error, loading } = props

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex w-80 flex-col gap-4 text-center"
    >
      <div>
        <h1 className="text-2xl font-bold uppercase">Login</h1>
        <p className="text-slate-600">Login to the best platform</p>
      </div>

      {error && (
        <div className="text-center text-sm text-red-700">
          <p>{error}</p>
        </div>
      )}

      <Input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleOnChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleOnChange}
      />

      <Button type="submit" disabled={loading} className="mt-8">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Let&apos;s go
      </Button>

      <div className="text-sm text-slate-600">
        <p>Don&apos;t have an account?</p>
        <p>
          <Link href="/auth/register" className="hover:underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  )
}

export { LoginUI }
