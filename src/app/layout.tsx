import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NS Hello World',
  description: 'A festive Hello World built with Next.js in NS colours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
