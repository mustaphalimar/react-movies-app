import React from 'react'
import './Pages.css'
import {movies_pages_list} from './data'
import {useGlobalContext} from '../context'
import {Link} from 'react-router-dom'
import '../App.css'

const Sidebar = () => {
    const {current,setCurrent,currentCategory,setCurrentCategory,categories,isSidebarToggled,setIsSidebarToggled} = useGlobalContext()

    const handleClick = ()=>{
        setIsSidebarToggled(!isSidebarToggled)
    }
    return (<div className="all-side-bar">
            {isSidebarToggled ? (<aside className={`sidebar ${isSidebarToggled ? "show-side-bar" : ""}`}>
                <div className="toggle-btn">
                    <button onClick={handleClick}><i className="fas fa-times"></i></button>
                </div>
                <div className="movies-pages">
                    <ul className="movies-pages-list scroll1" style={{overflow : movies_pages_list.length > 3 ? 'scroll' : 'hidden' , overflowX : 'hidden'}}>
                        {movies_pages_list.map((item,index)=>{
                            if(item.type === current){
                                return <li className="current" key={index} onClick={()=>setCurrent(item.type)}> <Link to="/" key={index}>{item.name}</Link></li>
                            }
                            return <li key={index} onClick={()=> setCurrent(item.type)}><Link to="/" key={index}>{item.name}</Link></li>
                        })}
                    </ul>
                </div>
                <div className="underline"></div>
                <div className="movies-categories">
                    <ul className="movies-categories-list scroll1">
                        {categories.map((category,index)=>{
                            if(currentCategory && category.name === currentCategory.name){
                                return <li className="current" key={index} onClick={()=> setCurrentCategory(category)}><Link to="/" key={index}>{category.name}</Link></li>
                            }
                            return <li key={index} onClick={()=> setCurrentCategory(category)}><Link to="/" key={index}>{category.name}</Link></li>
                        })}
                    </ul>
                </div>
            </aside>) : <aside className="side-bar">
                <div className="toggle-btn">
                    <button onClick={handleClick}><i className="fas fa-bars"></i></button>
                </div>
                        
                </aside>}
            </div>
    )
}

export default Sidebar
