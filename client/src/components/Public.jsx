import { useState, useEffect } from 'react'
import Signal from '../image/signal-tower.png'
import Tulp from '../image/tulip.png'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicImage from "../image/vecteezy_man-with-map-pin-and-paper-document-in-hand-flat-design_.jpg"

const Public = () => {

    return (
        <>
            <PublicHeader />
            <div className='full__content'>
              <div className='left__dashboard'>
                <p className='public_title'>Добро пожаловать на сайт карты Операторов связи города Шымкент!</p>
                <h2 className='public_title_second'>Для того чтобы получить информацию сайта необходимо авторизоваться!</h2>
                <Link
                    to={"/login"}
                >
                    <button className='public__button'>
                        Перейдти на страницу
                    </button>
                </Link>
              </div>
              <div className='right__dashboard'>
                <img className='public__image' src={ PublicImage } />
              </div>
            </div>
        </>
    )
}

export default Public