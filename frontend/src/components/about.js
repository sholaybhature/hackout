import React from 'react'
import MiniDrawer from './navbar'
import GitLogo from '../svg/github.svg';

export default function About() {

    return (
        <div className = "grid-about">
            <div className = "grid-item">
                <MiniDrawer />
            </div>
            <div className = "grid-item-about">
                <div className = 'about-container'>
                    <h1 className = "about-heading">
                        ABOUT US
                    </h1>
                    <div className = 'about-text'>
                    Ayan Jain - B.E (EIC), Thapar Institute <br></br><br></br>
                    Monark Jain - BCA, VIPS <br></br><br></br>
                    Rohan Arora - B.A (Hons.) Economics, St. Stephen's College <br></br><br></br>
                    Saurabh Brar - B.Sc (Hons.) Mathematics, Shivaji College <br></br><br></br>
                    </div> 
                </div>
            </div>
            <div className = 'git-icon'>
                <a href = "https://github.com/reedkihaddi/hackout" target="_blank" rel="noreferrer">
                    <img src = {GitLogo} alt = "GitHub Logo" className = "svg_icons"/>
                </a>
            </div>
            <div className = 'footer'>
                A crowdsourced initiative.
            </div>
        </div>
    )
}