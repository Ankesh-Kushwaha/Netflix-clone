import React from 'react'
import { useRef ,useEffect} from 'react'
import './NavBar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_img from "../../assets/caret_icon.svg"
import { logOut } from '../../firbase'

function NavBar() {
  const navRef = useRef();
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      }
      else {
          navRef.current.classList.remove("nav-dark");
      }
     })
  },[])

  return (
    <div ref={navRef} className="navBar">
      <div className="navBar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navBar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_img} alt="" />

          <div className="dropdown">
            <p onClick={() => {
              logOut();
             }}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar