import Link from 'next/link'
import { User2 } from 'lucide-react'

function Header() {
  return (
    <header className="flex w-full items-center justify-between py-8">
      <Link href="/" className="font-bold">
        Workfully
      </Link>
      <User2 />
    </header>
  )
}

export { Header }
