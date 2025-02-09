import { PWARegister } from "@/components/pwa-register"
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'nexa'
const description =
  'Một công cụ tìm kiếm và trả lời, được hỗ trợ bởi AI. Được phát triển bởi Nguyễn Tiến Đạt & Nguyễn Văn Toàn'

export const metadata: Metadata = {
  metadataBase: new URL('https://morphic.sh'),
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@miiura'
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "nexa",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableSaveChatHistory =
    process.env.NEXT_PUBLIC_ENABLE_SAVE_CHAT_HISTORY === 'true'
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          {enableSaveChatHistory && <Sidebar />}
          <PWARegister />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
