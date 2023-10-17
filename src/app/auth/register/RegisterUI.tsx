'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function RegisterUI() {
  return (
    <form className='flex flex-col text-center gap-4 w-80'>
      <div>
        <h1 className='font-bold uppercase text-2xl'>Register</h1>
        <p className='text-slate-600'>Sign up to the best platform</p>
      </div>

      <Input name='username' type='text' placeholder='Username' />
      <Input name='email' type='email' placeholder='Email' />
      <Input name='password' type='password' placeholder='Password' />

      <Button type='submit' className='mt-8'>
        Register
      </Button>
    </form>
  )
}

export { RegisterUI }
