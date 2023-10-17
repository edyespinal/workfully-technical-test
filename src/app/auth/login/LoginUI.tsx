import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function LoginUI() {
  return (
    <form className='flex flex-col text-center gap-4 w-80'>
      <div>
        <h1 className='font-bold uppercase text-2xl'>Login</h1>
        <p className='text-slate-600'>Login to the best platform</p>
      </div>

      <Input type='email' placeholder='Email' />
      <Input type='password' placeholder='Password' />

      <Button type='submit' className='mt-8'>
        Let&apos;s go
      </Button>
    </form>
  )
}

export { LoginUI }
