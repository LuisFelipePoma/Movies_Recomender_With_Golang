export const URL_API = import.meta.env.VITE_API_URL
export const URL_WS = import.meta.env.VITE_API_WS

// export const URL_TMDB = ''
export const URL_IMG = (tmdb_path_img: string, type: string = 'w200') =>
  `https://image.tmdb.org/t/p/${type}${tmdb_path_img}`

export const URL_TMDB = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}`

export const API_TMDB = import.meta.env.VITE_API_TMDB

export const PLACEHOLDER_URL = 'https://via.placeholder.com/200x300'
