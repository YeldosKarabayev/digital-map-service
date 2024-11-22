import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import PublicImage from "../../image/vecteezy_man-with-map-pin-and-paper-document-in-hand-flat-design_.jpg"

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    const content = (
        <section className="welcome">
            <div className='full__content'>
                <div className="left__dashboard" >
                <h1 className="public_title_second">Добро пожаловать, { username }!</h1>
                {/* <h1>Добро пожаловать на сервис "Карта операторов" связи города Шымкент!</h1> */}
                <div className="dash_buttons">
                    <Link to="/dash/map">
                        <button className='dash__button'>
                            Перидти на страницу Карта
                        </button>
                    </Link>
                
                    {( isManager || isAdmin ) 
                        && <Link to="/dash/users">
                            <button className='dash__button'>
                                Все пользователи
                            </button>
                        </Link>}
                    {( isManager || isAdmin ) 
                        && 
                        <Link to="/dash/users/new">
                            <button className='dash__button'>
                                Добавить нового пользователья
                        </button>
                        </Link>}
                </div>
                </div>
                <div className='right__dashboard'>
                    <img className='public__image' src={ PublicImage } />
              </div>
            </div>
        </section>
    )
  return content
}

export default Welcome
