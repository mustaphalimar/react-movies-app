import React from 'react'
import {useParams,Link} from 'react-router-dom'
import './Movie.css'
import logo from './star.png'
import Loading from '../Pages/Loading'
import Movie from './Movie'
import '../App.css'

import {useGlobalContext} from '../context'

// <iframe width="560" height="315" src="https://www.youtube.com/embed/esX7SFtEjHg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
// https://api.themoviedb.org/3/movie/${id}/videos?api_key=4a341142e78c862528cf762bbd7b17c9

const SingleMovie = (props)=>{
    const {id} = useParams()
    props.setCurrentId(id)
    const {singleMovie,loading,key,similarMovies} = useGlobalContext()
    const {original_title,poster_path,vote_average,release_date,spoken_languages,budget,genres,revenue,overview} = singleMovie
    const image = poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : ''

    if(loading){
        return <Loading/>
    }

    

    return <section className="single-movie-container">
        <button className="back-home-page"><i className="fas fa-arrow-left"></i><Link to="/">Back Home</Link></button>
        <div className="single-movie-info">
                <div className="movie-info-container">
                        <div className="movie-title-info">
                            <h1 className="single-movie-title">{original_title ? original_title : '(No title)'}</h1>
                            <div className="movie-info-rate">
                                <img src={logo} alt="star"/>
                                <h4 className="movie-info-vote">{vote_average && vote_average} <span>/10</span> </h4>
                            </div>
                        </div>
                        <div className="movie_infos">
                                <div className="poster-container">
                                        <img src={image} alt={original_title}/>
                                </div>
                                <div className="info-container">
                                
                                    <div className="single-movie-more-info">
                                        <p className="movie-info"><div className="movie-info-div">Release Date</div> <div className="movie-info-info">{release_date && release_date}</div></p>
                                        <p className="movie-info"><div className="movie-info-div">Original Lang</div> <div className="movie-info-info">{ spoken_languages && spoken_languages[0].name}</div></p>
                                        <p className="movie-info"><div className="movie-info-div">Budget</div> <div className="movie-info-info">{ budget && budget}$</div></p>
                                        <p className="movie-info"><div className="movie-info-div">Genres</div> <div className="movie-info-info">{genres && genres.map((genre) => <div className="single-movie-genre">{genre.name}</div>)}</div></p>
                                        <p className="movie-info"><div className="movie-info-div">Revenue</div> <div className="movie-info-info">{ revenue && revenue}$</div></p>
                                        <p className="movie-info"><div className="movie-info-div">Overview</div></p><div className="movie-info-info overview">{overview && overview}</div>
                                    </div>  
                                </div>
                        </div>
                </div>
                <div className="movie-triller-container">
                    <div className="movie-tirller-title">
                        <h1 className="subtitle">Triller</h1>
                    </div>
                    <div className="movie-triller">
                            {id && <iframe className="movie-triller-ytb" title={original_title} src={`https://www.youtube.com/embed/${key}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                    </div>
                </div>
                <div className="similar-movies-section">
                    <div className="movie-tirller-title similar">
                            <h1 className="subtitle">Similar Movies</h1>
                    </div>
                    <div className="similar-movies">
                        {similarMovies && similarMovies.length !==0 && similarMovies.map((movie,index)=>{
                            return <div key={index} className="similar-movie-item"><Movie key={index} {...movie}/></div>
                        })}
                    </div>
                </div>
        </div>
    </section>
}

export default SingleMovie;