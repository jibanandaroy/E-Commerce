import React, { useEffect, useRef } from 'react'
import './Hero.css'
// import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import Hero_img from '../Assets/hero-img.png'
import { init } from 'ityped'
export const Hero = () => {
    const haldleClick = async () => {
        window.scrollTo({
            top: 2050,
            behavior: 'smooth'
          });
    }

    const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed:60,
      strings: ["Men","Women", "Kids"]
    });
  }, []);
    return (
        <div>
            <div className="Hero">
                <div className="Hero_left">
                    <h2>New Arrivals Only</h2>
                    <div className='hero_title'>
                        <p>New Collections</p>
                        <p>
                            For <span ref={textRef}></span>
                        </p>
                    </div>
                    <div className="Hero_latest_btn" onClick={haldleClick}>
                        <button>Latest Collections</button>
                        <button>Contact us </button>
                    </div>
                    
                </div>
                <div className="Hero_right">
                    <img src={Hero_img} alt="" />
                </div>
            </div>
        </div>
    )
}
