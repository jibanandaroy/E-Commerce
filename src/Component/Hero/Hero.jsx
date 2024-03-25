import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import Hero_img from '../Assets/hero_image.png'

export const Hero = () => {
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
                <div className="Hero_latest_btn">
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
