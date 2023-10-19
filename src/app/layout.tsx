import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { cn } from '@/utils/mergeClasses'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

import { RootProvider } from './RootProvider'
import './globals.css'

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
    <html lang="en">
      <body
        className={cn(
          'mx-auto grid min-h-screen max-w-sm grid-rows-[auto_1fr_auto] md:max-w-lg lg:max-w-4xl',
          font.className
        )}
      >
        <RootProvider>
          <Header />
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  )
}
