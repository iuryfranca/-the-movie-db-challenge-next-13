'use client'

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'

import { api } from '@/lib/axios'

interface Props {
  children: ReactNode
}

export interface MoviesProps {
  id?: number
  poster_path?: string
  title?: string
  release_date?: string
  vote_average?: number
  overview?: string
}

export interface GenreProps {
  id: number
  name: string
}

export interface SiteListProps {
  moviesList: MoviesProps[]
  genreList: GenreProps[]
}

type MoviesContextData = {
  moviesList: MoviesProps[]
  loadingData: boolean
  getMovies: (typeGet?: string) => void
  incrementPageNumber: () => void
  numberPage: number
  genreSelected: number[]
  setGenreSelected: Dispatch<SetStateAction<number[]>>
}
const apiKey = process.env.NEXT_PUBLIC_API_KEY_V3

export const MoviesContext = createContext({} as MoviesContextData)

export const MoviesProvider: FC<Props> = ({ children }) => {
  const [numberPage, setNumberPage] = useState<number>(1)
  const [loadingData, setLoadingData] = useState<boolean>(true)
  const [moviesList, setMoviesList] = useState<MoviesProps[]>([])
  const [genreSelected, setGenreSelected] = useState<number[]>([])

  const getMovies = useCallback(
    async (typeGet: string = 'popular') => {
      const pageNumberUrl = `&page=${numberPage}`
      const bodyApi =
        typeGet === 'popular' ? '/movie/popular?' : '/discover/movie?'

      if (typeGet === 'discover') {
        setMoviesList([])
      }

      setLoadingData(true)

      api
        .get(`${bodyApi}${apiKey}${pageNumberUrl}`, {
          params: {
            with_genres:
              genreSelected.length > 0 ? genreSelected.toString() : null,
          },
        })
        .then((res) => {
          setMoviesList([...moviesList, ...res.data.results])
        })
        .catch((err) => new Error('Failed to fetch data: ', err))
        .finally(() => {
          setLoadingData(false)
        })
    },
    [numberPage, moviesList]
  )

  function incrementPageNumber() {
    setNumberPage(numberPage + 1)
  }

  // useEffect(() => {
  //   getMovies()
  // }, [numberPage])

  return (
    <MoviesContext.Provider
      value={{
        moviesList,
        loadingData,
        numberPage,
        getMovies,
        incrementPageNumber,
        genreSelected,
        setGenreSelected,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export const useMoviesContext = () => {
  const context = useContext(MoviesContext)

  if (!context) {
    throw new Error('useMoviesContext must be used within a MoviesProvider')
  }

  return context
}
