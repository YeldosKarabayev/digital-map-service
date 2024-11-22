import { useState, useEffect } from 'react'
import Signal from '../image/signal-tower.png'
import Tulp from '../image/tulip.png'
import { useNavigate, Link, useLocation } from 'react-router-dom';

const PublicHeader = () => {
    const content = (
        <div className='header__public'>
        <div className='container' style={{alignItems: "center", justifyContent: "space-between", display: "flex"}}>
            <div style={{display: "flex", alignItems: 'center', fontSize: "22px", color: "#fff", marginLeft: "0px"}}>
                <img src={Tulp} style={{width: "38px", height: "38px", marginRight: "10px"}} alt="logo" />
                SHYMKENT
            </div>
            <div className='headerRight'>
            <div style={{display: "flex", alignItems: 'center', fontSize: "22px", color: "#fff"}}>
                Операторы связи
                <img src={Signal} style={{width: "36px", height: "36px", marginLeft: "10px"}} alt="logo" />
            </div>
            </div>
        </div>
        </div>
    )


  return content
}

export default PublicHeader