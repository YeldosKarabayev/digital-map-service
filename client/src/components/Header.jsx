import { useState, useEffect } from 'react'
import Signal from '../image/signal-tower.png'
import Tulp from '../image/tulip.png'
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';


const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/users(\/)?$/


const Header = () => {
    const { isManager, isAdmin } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
      isLoading,
      isSuccess,
      isError, 
      error
  }] = useSendLogoutMutation()


  useEffect(() => {
      if(isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onNewUserClicked = () => navigate('/dash/users/new')
  const onUserClicked = () => navigate('/dash/users')
  const onLogoutClicked = () => sendLogout()



  let dashClass = null
    if (!DASH_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className='headerButton'
                title='Новый пользователь'
                onClick={onNewUserClicked}
            ></button>
        )
    }

    let userButton = null
    if(isManager || isAdmin) {
        if (USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            newUserButton = (
                <button
                    className='headerButton'
                    title='Пользовательи'
                    onClick={onUserClicked}
                ></button>
            )
        }
    }

    const logoutButton = (
      <button
          className="headerButton"
          title="Выйти"
          onClick={sendLogout}
      >
        Выйти
      </button>
  )

  const errClass = isError ? "errmsg" : "offscreen"

  let buttonContent
  if(isLoading) {
    buttonContent = <p>Выход из системы...</p>
  } else {
    buttonContent = (
        <> 
            {newUserButton}
            {userButton}
            {logoutButton}
        </>
    )
  }


  return (
    <>
    {/* <p className={errClass}>{error?.data?.message}</p> */}

    <div className='header'>
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
             {buttonContent}
            </div>
        </div>
    </div>
    </>
  )
}

export default Header