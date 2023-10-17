import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserCheck2Icon } from 'lucide-react'

function ProfileUI() {
  return (
    <div className='flex flex-col gap-2 items-start'>
      <h1 className='font-bold text-2xl mb-4'>My Profile</h1>
      <UserCheck2Icon size={64} />
      <p className='text-slate-600 mb-4'>
        You&apos;re logged in as <span className='font-bold'>username</span>
      </p>

      <div className='grid grid-cols-3 w-96 mb-16'>
        <p>Name</p>
        <span className='col-span-2 font-bold'>name</span>

        <p>Last name</p>
        <span className='col-span-2 font-bold'>lastname</span>

        <p>Email</p>
        <span className='col-span-2 font-bold'>email</span>
      </div>

      <Button>Log out</Button>
    </div>
  )
}

export { ProfileUI }
