import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import usePersist from '../../hooks/usePersist';


const Auth = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [login, { isLoading}] = useLoginMutation()

  //let [loading, setLoaging] = useState(true);

  // useEffect(() => {
  //   userRef.current.focus()
  // }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password })
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch(err) {
      if(err.status) {
        setErrMsg("Нет ответа от сервера!");
      } else if (err.status === 400) {
        setErrMsg("Неправильный Имя или Пароль!");
      } else if (err.status === 401) {
        setErrMsg("Не удалось авторизоваться!");
      } else {
        setErrMsg(err.data?.message);
      }
      // errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if(isLoading) return 
    //<p>Загрузка...</p>
    <ClipLoader 
      loading={isLoading}
      size={150}
      aria-label='Loading Spinner'
      data-testid="loader"  
    />

  

  return (
    <>
    <div className='full'>
    <div className='signupScreen'>
      <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username' className='title'>Авторизация</label>
          <input 
                className='inputs'
                id="username"
                type="text"
                placeholder='Логин'
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                autoComplete='off'
                required
           />
          <input className='inputs'
                type={showPassword ? 'text' : 'password'}
                placeholder='Пароль'
                id='password'
                onChange={handlePwdInput}
                value={password}
                required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {/* Кнопка для скрытия/отображения пароля */}
              {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          </button>
          <button>Войти</button>
          <label htmlFor='persist' className='form__persist'>
            <input
              type='checkbox'
              className='form__checkbox'
              id='presist'
              onChange={handleToggle}
              checked={persist}
            />
            Доверяю странице
          </label>
        </form>
        {/* {error && <p>{error}</p>} */}
    </div>
    </div>
    </>
  )
}

export default Auth