import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import Hero_img from '../Assets/hero_img.png'

export const Hero = () => {
    const haldleClick = async () =>{
        
        window.scrollTo(0,2800)
      }
  return (
    <div>
        <div className="Hero">
            <div className="Hero_left">
                <h2>New ARRIVALS ONLY</h2>
                <div>
                    <div className="Hero_hand_icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="Hero_latest_btn" onClick={haldleClick}>
                    <div>Latest Collections</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="Hero_right">
                <img src={Hero_img} alt="" />
            </div>
        </div>
    </div>
  )
}
