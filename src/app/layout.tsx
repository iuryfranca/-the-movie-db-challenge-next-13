import { Inter as FontSans } from '@next/font/google'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteFooter } from '@/components/site-footer'
import { Analytics } from '@/components/analytics'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='pt-BR'>
      <head />
      <body
        className={cn(
          'min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex min-h-screen -mb-24 flex-col'>{children}</div>
          <Analytics />
          <SiteFooter />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
