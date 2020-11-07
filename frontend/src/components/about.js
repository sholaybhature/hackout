import React from 'react'
import MiniDrawer from './navbar'

export default function About() {
    return (
        <div className = "grid-about">
            <div className = "grid-item">
                <MiniDrawer />
            </div>
            <div className = "grid-item">
                <div className = "about-text">
                     habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget ti
                </div> 
            </div>
        </div>
    )
}