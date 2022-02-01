import React, {useContext, useEffect, useState} from 'react'

const AppContext = React.createContext()

const API_KEY = "4a341142e78c862528cf762bbd7b17c9"


const AppProvider = ({ children }) => {
  const [movies,setMovies] = useState({})
  const [current,setCurrent] = useState('popular')
  const [search,setSearch] = useState('')
  const [categories,setCategories] = useState([])
  const [currentId,setCurrentId] = useState(null)
  const [singleMovie,setSingleMovie] = useState({})
  const [currentCategory,setCurrentCategory] = useState(undefined)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [key,setKey] = useState('')
  const [similarMovies,setSimilarMovies] = useState([])
  const [isSidebarToggled,setIsSidebarToggled] = useState(false)


  const fetchMovies = async ()=>{
    const url = `https://api.themoviedb.org/3/movie/${current}?api_key=${API_KEY}&page=${page}`
    try {
      setLoading(true)
      const response = await fetch(url)
      const moviesData = await response.json()
      const movies = {current : current, movies : moviesData.results}
      setMovies(movies)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchMoviesBySearch = async ()=>{
    if(search){
      try {
        setLoading(true)
        const url = `https://api.themoviedb.org/3/search/movie?api_key=4a341142e78c862528cf762bbd7b17c9&query=${search}&page=1`
        const response = await fetch(url)
        const data = await response.json()
        const movies = {current : current,search : search, movies : data.results}
        setMovies(movies)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
  }
  const fetchMoviesByCategory = async ()=>{
    if(currentCategory){
      try {
        setLoading(true)
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${currentCategory.id}`
        const response = await fetch(url)
        const data = await response.json()
        const movies = {current : current,category : currentCategory.name, movies : data.results}
        setMovies(movies)
        setSearch('')
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
  }
  const getMoviesGenres = async ()=>{
   try {
      setLoading(true)
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      const data = await response.json()
      setCategories(data.genres)
      setSearch('')
      setLoading(false)
   } catch (error) {
    console.log(error);
   }
  }

  const getMovieDetailsById = async (id)=>{
   if(currentId){
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setSingleMovie(data)
      setLoading(false)

    } catch (error) {
      console.log(error);
    }
   }
  }

  const fetchMovieVideo = async ()=> {
    try {
      if(currentId){
        setLoading(true)
          const url = `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=${API_KEY}`
          const response = await fetch(url)
          const data = await response.json()
          setKey(data.results[0].key)
          setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const fetchSimilarMovies = async ()=>{
    try {
      if(currentId){
        setLoading(true)
        const url = `https://api.themoviedb.org/3/movie/${currentId}/similar?api_key=4a341142e78c862528cf762bbd7b17c9&page=1`
        const response = await fetch(url)
        const data = await response.json()
        setSimilarMovies(data.results)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getMovieDetailsById(currentId)
    fetchMovieVideo(currentId)
    fetchSimilarMovies()
  },[currentId])

  useEffect(()=>{
    getMoviesGenres()
  },[])

  useEffect(()=>{
    fetchMoviesByCategory()
  },[currentCategory])

  useEffect(()=>{
    fetchMovies()
  },[current,page,currentCategory])

  useEffect(()=>{
    fetchMoviesBySearch()
  },[search,page])


  const resetAll = ()=>{
    setLoading(true)
    setSearch('')
    setCurrent('popular')
    fetchMovies()
    setCurrentCategory(undefined)
    setPage(1)
    setLoading(false)
  }

  return <AppContext.Provider value={{
    movies,
    setCurrent,
    page,
    setPage,
    loading,
    current,
    currentCategory,
    setCurrentCategory,
    categories,
    resetAll,
    setSearch,
    setCurrentId,
    singleMovie,
    key,
    search,
    similarMovies,
    isSidebarToggled,
    setIsSidebarToggled
  }}>
      {children}
  </AppContext.Provider>
}



export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
