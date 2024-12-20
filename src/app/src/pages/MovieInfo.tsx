/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MovieResponse } from '../types/movies'
import { getRecommendations } from '../services/movies'
import { ListMovies } from '../components/ListMovies'
import Skeleton from 'react-loading-skeleton'
import { PLACEHOLDER_URL, URL_IMG } from '../consts/api'
import { TmdbResponse } from '../types/tmdb'
import { useStore } from '../services/store'
import { VoteAvg } from '../components/Items/VoteAvg'
import { motion } from 'framer-motion'
import { NavigationBtn } from '../components/Items/NavigationBtn'
import { GenreTag } from '../components/Items/GenreTag'

const MovieInfo: React.FC = () => {
  const location = useLocation()
  const { movie } = location.state as { movie: MovieResponse }
  const { movieInfo } = location.state as { movieInfo: TmdbResponse }
  const [recomendations, setRecomendations] = React.useState<MovieResponse[]>(
    []
  )
  const [filterRecomendations, setFilterRecomendations] = React.useState<
    MovieResponse[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const setBackgroundPath = useStore((state: any) => state.setBackgroundPath)
  const forwardHistory = useStore((state: any) => state.forwardHistory)
  const setForwardHistory = useStore((state: any) => state.setForwardHistory)
  const navigate = useNavigate()
  const nMoviesRecomendations = useStore(
    (state: any) => state.nMoviesRecomendations
  )
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  useEffect(() => {
    let isMounted = true

    setLoading(true)
    getRecommendations(movieInfo.id!, nMoviesRecomendations).then(res => {
      if (isMounted) {
        setRecomendations(res.movie_response!)
        setFilterRecomendations(res.movie_response!)
        setLoading(false)
      }
    })

    setBackgroundPath(movieInfo.backdrop_path)
    return () => {
      isMounted = false
      setBackgroundPath(null)
    }
  }, [movieInfo, nMoviesRecomendations, setBackgroundPath])

  function handleForward () {
    setForwardHistory(forwardHistory - 1)
    navigate(1)
  }
  function handlePrevious () {
    setForwardHistory(forwardHistory + 1)
    navigate(-1)
  }

  function handleSelectedGenres (genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre))
      return
    }
    setSelectedGenres([...selectedGenres, genre])
  }

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilterRecomendations(recomendations)
    } else {
      // filter recomendations by selected genres, has to have all the genres of selectedgenres
      const filtered = recomendations.filter(movie =>
        // movie.genres : string
        selectedGenres.every(genre => movie.genres?.includes(genre))
      )
      setFilterRecomendations(filtered)
    }
  }, [selectedGenres, recomendations])

  return (
    <motion.div
      initial={{ opacity: 0.15, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0.15, x: -100 }}
      transition={{ duration: 0.75 }}
      className='grid grid-cols-1 gap-10 place-content-center w-[100%]'
    >
      <div className='flex justify-between'>
        <NavigationBtn handleDirection={handlePrevious}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            width={36}
            height={36}
            strokeWidth={2}
          >
            {' '}
            <path d='M9 14l-4 -4l4 -4'></path>{' '}
            <path d='M5 10h11a4 4 0 1 1 0 8h-1'></path>{' '}
          </svg>
        </NavigationBtn>
        {forwardHistory > 0 ? (
          <NavigationBtn handleDirection={handleForward}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              width='36'
              height='36'
              stroke-width='2'
            >
              <path d='M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1'></path>{' '}
            </svg>
          </NavigationBtn>
        ) : (
          ''
        )}
      </div>
      <section className='flex gap-5 h-[500px] w-full items-center'>
        <div className='flex-shrink-0 '>
          <img
            src={
              movieInfo.poster_path
                ? URL_IMG(movieInfo.poster_path, 'w300')
                : PLACEHOLDER_URL
            }
            alt={movieInfo.title}
            className='w-[300px] h-[450px] rounded-md self-center filter drop-shadow-md  brightness-95 hover:brightness-105 transition-all duration-1000 ease-in-out'
          />
        </div>
        <div className='flex flex-auto flex-col h-full gap-3 justify-between gap-y-10 '>
          <article className='flex justify-between items-center'>
            <section className='flex flex-col gap-3'>
              <h3 className='underline font-semibold text-balance pr-1'>
                {movieInfo.title} (
                {movieInfo?.release_date
                  ? new Date(movieInfo.release_date).getFullYear()
                  : '20XX'}
                )
              </h3>
              <p className='italic'>{movieInfo.tagline}</p>
            </section>
            <VoteAvg vote_average={movieInfo.vote_average} />
          </article>
          <article className='flex flex-col gap-5'>
            <p className='text-body-16 text-balance'>{movieInfo.overview}</p>
            <p className='flex flex-wrap gap-3 select-none'>
              {movieInfo.genres!.map(genre => (
                <GenreTag
                  genre={genre}
                  onClick={handleSelectedGenres}
                  className={
                    selectedGenres.includes(genre.name!) ? 'bg-tertiary' : ''
                  }
                  key={'mi-tg-' + genre.id}
                />
              ))}
            </p>
          </article>
          <article className='flex flex-col gap-2 text-balance'>
            <p>
              <span className='font-bold text-primary'>Release Date: </span>
              {/* Format to 19 November, 2015 */}
              {new Date(movieInfo.release_date!).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p>
              <span className='font-bold text-primary'>Director: </span>
              {movie.director}
            </p>
            <section className='flex gap-5 justify-around'>
              <p className='w-[50%] line-clamp-5'>
                <span className='font-bold text-primary'>Actors: </span>
                {movie.actors?.split(',').join(', ')}
              </p>
              <p className='w-[50%] line-clamp-5'>
                <span className='font-bold text-primary'>Characters: </span>
                {movie.characters?.split(',').join(', ')}
              </p>
            </section>
          </article>
        </div>
      </section>
      <section className='flex flex-col gap-5'>
        <h4 className=''>Peliculas Similares</h4>
        <div className='flex flex-wrap gap-3'>
          {loading ? (
            Array.from({ length: 7 }).map((_, i) => (
              <Skeleton
                key={i}
                width={200}
                height={300}
                baseColor='#0B0000'
                highlightColor='#1B0000'
                borderRadius='10px'
                direction='rtl'
                enableAnimation={true}
                duration={6}
              />
            ))
          ) : (
            <ListMovies movies={filterRecomendations} />
          )}
        </div>
      </section>
    </motion.div>
  )
}

export default MovieInfo
