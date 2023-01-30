import Link from 'next/link'

import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'
import { getCurrentUser } from '@/lib/session'

export default async function LoginPage() {
  const session = await getCurrentUser()

  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Link
        href='/'
        className='absolute top-4 left-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center text-sm  font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8'
      >
        <>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          Back
        </>
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <Icons.logo className='mx-auto h-6 w-6' />
          <h1 className='text-2xl font-bold'>Welcome back</h1>
          <p className='text-sm text-slate-700 dark:text-slate-400'>
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
