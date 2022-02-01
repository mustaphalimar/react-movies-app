import React, {useState } from 'react'
import './Pages.css'
import {useGlobalContext} from '../context'
import {Link} from 'react-router-dom'
import '../App.css'

const Navbar = ()=>{
    const {setSearch} = useGlobalContext()
    const [searchValue,setSearchValue] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        setSearch(searchValue)
    }
    
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/"><a href="index.html"><h1 className="logo-title">MoviesWorld</h1></a></Link>
            </div>
            <div className="search-movie">
                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="search-icon">
                        <i onClick={handleSubmit} className="fas fa-search" style={{cursor : 'pointer'}}></i>
                    </div>
                    <input type="text" placeholder="Search movies.." value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}/>
                </form>
            </div>
        </nav>
    )
}

export default Navbar