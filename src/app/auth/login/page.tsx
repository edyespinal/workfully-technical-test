'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import z from 'zod'

import { useSession } from '@/hooks/useSession'
import { LoginUI } from './LoginUI'
import { validate } from '@/utils/validate'

const validateLogin = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
})
type LoginValues = z.infer<typeof validateLogin>

function LoginPage() {
  const router = useRouter()
  const { login } = useSession()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState<LoginValues>({
    email: '',
    password: '',
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError('')
    setLoading(true)

    try {
      e.preventDefault()

      const { data, success, error } = validate(formValues, validateLogin)

      if (!success || !data) {
        throw new Error(error)
      }

      await login(data.email, data.password)

      router.push('/')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return <LoginUI {...{ handleOnChange, handleOnSubmit, loading, error }} />
}

export default LoginPage
