import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { User2, UserCircle } from 'lucide-react'
import Link from 'next/link'

const font = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Workfully',
  description: 'Workyfully frontend for the technical test',
  icons: ['/favicon.webp'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen grid grid-rows-[auto_1fr_auto] max-w-4xl mx-auto',
          font.className
        )}
      >
        <header className='w-full py-8 flex items-center justify-between'>
          <Link href='/' className='font-bold'>
            Workfully
          </Link>
          <User2 />
        </header>
        {children}
        <footer>
          <div className='text-slate-600 text-center text-sm py-2'>
            made by Edy Espinal
          </div>
        </footer>
      </body>
    </html>
  )
}
