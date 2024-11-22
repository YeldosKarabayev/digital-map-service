import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = ({ history }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      alert("Пользователь успешно добавлен!")
      navigate('/home');
    } catch (error) {
      alert("Ошибка при регистрации!")
      console.error(error);
    }
  };



  return (
    <div className='full'>
    <div className='signupScreen'>
        <form onSubmit={handleSubmit}>
          <h1 className='title'>Регистрация</h1>
          <input className='inputs'
                type="text"
                placeholder='Имя'
                name='name'
                onChange={handleChange}
           />
          <input className='inputs'
                type="text"
                placeholder='Логин'
                name='email'
                onChange={handleChange}
           />
          <input className='inputs'
                type={showPassword ? 'text' : 'password'}
                placeholder='Пароль'
                name='password'
                onChange={handleChange}
          />

        <select className='roleButton'  value={formData.role} name="role" onChange={handleChange}>
          <option value="user">Пользователь</option>
          <option value="admin">Администратор</option>
        </select>
       
          {/* <div className='roleButton'>
            <input className='flex text-white'
              type='radio'
              value='user'
              checked={formData.role.enum === 'user'}
              onChange={handleChange}
            />
            <label className="ml-1 xl:text-sm">Пользователь</label>
          </div>
          <div className='roleButton'>
            <input className='flex text-white'
              type='radio'
              value='admin'
              checked={formData.role.enum === 'admin'}
              onChange={handleChange}
            />
            <label className="ml-1 xl:text-sm">Администратор</label>
          </div> */}

    
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {/* Кнопка для скрытия/отображения пароля */}
              {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
        </button>
          <button type='submit'>Зарегистрировать</button>
        </form>
        {error && <p>{error}</p>}
    </div>
    </div>
  )
}

export default Registration