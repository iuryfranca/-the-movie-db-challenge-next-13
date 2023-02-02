import clsx from 'clsx'
import Image from 'next/image'
import { CircleProgressBar } from '@/components/circle-progress-bar'
import { formatShortDate } from '@/lib/utils'

interface CardMovieProps {
  poster_path?: string
  title?: string
  release_date?: string
  vote_average?: number
  overview?: string
}

export function CardMovie({
  poster_path,
  overview,
  release_date = null,
  title,
  vote_average = 0,
}: CardMovieProps) {
  const percentage = +vote_average.toFixed(1).toString().replace('.', '')
  const releaseDateFormatted = formatShortDate(release_date)
  const srcImage = 'https://image.tmdb.org/t/p/w185' + poster_path

  return (
    <div className='flex w-full text-slate-50 dark:text-slate-900 sm:w-[185px] sm:flex-col'>
      <div className='md:first-letter relative h-36 w-36 sm:h-[278px] sm:w-full'>
        <Image
          src={srcImage}
          priority
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='rounded-b-none rounded-r-none rounded-l-md sm:rounded-b-none sm:rounded-t-md'
          quality={100}
        />
      </div>
      <div className='relative flex h-36 w-full flex-col items-center justify-between gap-2 rounded-b-md rounded-r-md rounded-l-none bg-slate-900 p-2 pt-5 dark:bg-white sm:h-24 sm:rounded-t-none sm:rounded-b-md sm:pt-7'>
        <div className='absolute left-1 -top-6 z-20 hidden items-center justify-center rounded-full bg-slate-300  text-slate-50 dark:bg-slate-900 sm:flex'>
          <CircleProgressBar
            percentage={percentage}
            color={clsx({
              '#991b1b': percentage >= 0 && percentage < 25,
              '#f97316': percentage >= 25 && percentage < 40,
              '#fbbf24': percentage >= 40 && percentage < 60,
              '#bef264': percentage >= 60 && percentage < 70,
              '#22c55e': percentage >= 70,
            })}
          />
          <div className='absolute flex h-full w-full flex-row items-center justify-center py-4'>
            <p className='text-sm font-semibold'>{percentage}</p>
            <p className='self-start text-[10px]'>%</p>
          </div>
        </div>
        <div className='flex h-full w-full flex-col gap-1 sm:justify-between'>
          <p className='whitespace-wrap text-ellipsis text-sm font-bold line-clamp-2'>
            {title}
          </p>
          <p className='text-xs text-slate-300 dark:text-slate-600'>
            {releaseDateFormatted}
          </p>
        </div>
        <div className='flex h-24 w-full justify-start rounded-sm pb-2 sm:hidden'>
          <span className='whitespace-wrap text-ellipsis text-sm line-clamp-2'>
            {overview || 'Sem descrição.'}
          </span>
        </div>
      </div>
    </div>
  )
}
