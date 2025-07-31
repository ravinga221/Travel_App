import React, {useRef, useEffect} from 'react';
import { Container, Button, Row} from 'reactstrap'
import { NavLink, Link } from 'react-router-dom';
import './header.css';

import logo from '../../assets/images/logo.png';

const nav_links = [
  {
    path:'/home',
    display:'Home'
  },
   {
    path:'/about',
    display:'About'
  },
   {
    path:'/tour',
    display:'Tours'
  },
];

const Header = () => {

  const HeaderRef = useRef(null)

  const stickyHeaderFunc =() => {
    window.addEventListener('scroll', () =>{
      if(document.body.scrollTop >80 || document.documentElement.scrollTop >80)
        {HeaderRef.current.classList.add('sticky_header')
        }else{
          HeaderRef.current.classList.remove('sticky_header')
        }
    })
  }

  useEffect(()=>{
    stickyHeaderFunc()

    return window.removeEventListener('scroll',stickyHeaderFunc)
  })

  return (
    <header className='header' ref={HeaderRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between"
>
            {/* ===========logo=========== */}
            <div className='logo'>
              <img src={logo} alt='Logo'/>
            </div>
            {/* ===========logo end=========== */}
            {/* ===========menu start=========== */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
              {
                nav_links.map((item,index)=> (
                  <li className="nav_item" key={index} >
                    <NavLink to={item.path} className={navClass=> 
                      navClass.isActive ? "active_link":""} >
                      {item.display}
                    </NavLink>
                  </li>
                ))
              }
              </ul>
            </div>
            {/* ===========menu end=========== */}
            <div className="nav_right d-flex align-item-center gap-4"> 
            <div className="nav_btns d-flex align-item-center gap-4">
              <Button className="btn secondary__btn"><Link className='hello' to='/login'>Login</Link></Button>
              <Button className="btn primary__btn"><Link to='/register'>Register</Link></Button>
            </div>
            <span className="mobile_menu">
              <i class="ri-menu-line"></i>
            </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;