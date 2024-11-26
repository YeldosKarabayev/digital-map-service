// import { Outlet, Link } from "react-router-dom"
// import { useEffect, useRef, useState } from 'react'
// import { useRefreshMutation } from "./authApiSlice"
// import usePersist from "../../hooks/usePersist"
// import { useSelector } from 'react-redux'
//import { selectCurrentToken } from "./authSlice"

// const PersistLogin = () => {

//     const [persist] = usePersist()
//     const token = useSelector(selectCurrentToken)
//     const effectRan = useRef(false)

//     const [trueSuccess, setTrueSuccess] = useState(false)

//     const [refresh, {
//         isUninitialized,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useRefreshMutation()


//     useEffect(() => {

//         if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

//             const verifyRefreshToken = async () => {
//                 console.log('verifying refresh token')
//                 try {
//                     //const response = 
//                     await refresh()
//                     //const { accessToken } = response.data
//                     setTrueSuccess(true)
//                 }
//                 catch (err) {
//                     console.error(err)
//                 }
//             }

//             if (!token && persist) verifyRefreshToken()
//         }

//         return () => effectRan.current = true

//         // eslint-disable-next-line
//     }, [])


//     let content
//     if (!persist) { // persist: no
//         console.log('no persist')
//         content = <Outlet />
//     } else if (isLoading) { //persist: yes, token: no
//         console.log('loading')
//         content = <p>Загрузка...</p>
//     } else if (isError) { //persist: yes, token: no
//         console.log('error')
//         content = (
//             <p className='errmsg'>
//                 {`${error?.data?.message} - `}
//                 <Link to="/login">Пожалуйста, войдите еще раз</Link>.
//             </p>
//         )
//     } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
//         console.log('success')
//         content = <Outlet />
//     } else if (token && isUninitialized) { //persist: yes, token: yes
//         console.log('token and uninit')
//         console.log(isUninitialized)
//         content = <Outlet />
//     }

//     return content
// }
// export default PersistLogin

import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
    const [persist] = usePersist(); // Проверяем, включено ли сохранение сессии
    const token = useSelector(selectCurrentToken); // Получаем токен из состояния Redux
    
    let content;

    if (!persist) { // Если сохранение отключено
        console.log('no persist');
        content = <Outlet />;
    } else if (!token) { // Если токен отсутствует
        console.log('no token');
        content = (
            <div className="justify-center items-center h-20">
            <p className='errmsg'>
                Вы не авторизованы. <br />
                <a href="/login">Пожалуйста, войдите в систему</a>.
            </p>
            </div>
        );
    } else { // Если токен существует
        console.log('authenticated');
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;

