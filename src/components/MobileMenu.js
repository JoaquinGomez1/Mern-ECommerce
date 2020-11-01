import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import "../transition.css";
import MyLink from "./CustomNavLink";

export default function Menu({ currentUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalRef = useRef();

  const handleNavBar = () => {
    document.querySelector(".hamburger").classList.toggle("active");
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    isMenuOpen && modalRef.current.classList.toggle("transition");
  }, [isMenuOpen]);

  return (
    <div className='mobileViewMenu'>
      <div className='hamburger' onClick={handleNavBar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isMenuOpen && (
        <div className='menu-modal' ref={modalRef}>
          <ul>
            <MyLink route='/' exact text='HOME' onClick={handleNavBar} />
            <MyLink route='/products' text='PRODUCTS' onClick={handleNavBar} />
            <MyLink
              route='/categories'
              text='CATEGORIES'
              onClick={handleNavBar}
            />
            {currentUser ? (
              <MyLink route='/user' text='ACCOUNT' onClick={handleNavBar} />
            ) : (
              <>
                <MyLink route='/login' text='LOGIN' onClick={handleNavBar} />
                <MyLink
                  route='/register'
                  text='SIGN UP'
                  onClick={handleNavBar}
                />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
