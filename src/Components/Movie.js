import React, { useState } from 'react'
import './Movie.css'
import logo from './star.png'
import { Link} from 'react-router-dom'
import '../App.css'


const Movie = ({id,original_title,poster_path,release_date,vote_average})=>{
    const image = poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : ''
    const date = release_date ? release_date.slice(0, 4) : '' ;
    const [isHovered,setIsHovered] = useState(false)

    return <div className="movie-container">
        <div className="movie-image-container">
            <div className="background-scale">
                <div className="movie-background" style={{backgroundImage : `url(${image})`}} onMouseOver={()=> setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}>
                    <div className="movie-rate">
                        <img src={logo} alt=""/>
                        <h4 className="vote-average">{vote_average ? vote_average : ''}</h4>
                    </div>
                    <div className="movie-more-info">
                        <button className={`btn details-btn ${isHovered ? 'show' : ''}`}><Link to={`/movie/${id}`}>Details & Triller</Link></button>
                    </div>
                </div>
            </div>
        </div>
        <h5 className="movie-title">{original_title} <span>({date})</span> </h5>
    </div>
}

export default Movie;