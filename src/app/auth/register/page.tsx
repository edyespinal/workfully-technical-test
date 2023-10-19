'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import z from 'zod'

import { useSession } from '@/hooks/useSession'
import { validate } from '@/utils/validate'
import { RegisterUI } from './RegisterUI'

const validateRegister = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type RegisterValues = z.infer<typeof validateRegister>

function RegisterPage() {
  const { register } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState<RegisterValues>({
    username: '',
    email: '',
    password: '',
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError('')
    setLoading(true)

    try {
      e.preventDefault()

      const { data, success, error } = validate(formValues, validateRegister)

      if (!success || !data) {
        throw new Error(error)
      }

      await register(data.username, data.email, data.password)

      router.push('/')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return <RegisterUI {...{ handleOnChange, handleOnSubmit, loading, error }} />
}

export default RegisterPage
