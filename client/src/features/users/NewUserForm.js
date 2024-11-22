import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { ROLES } from "../../config/roles"
import { useNavigate } from "react-router"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const  [addNewUser, {
        isLoading, 
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState('Employee')

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
            alert("Новый пользователь добавлен!")
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''



  return (
    <div className='full'>
        <div className='signupScreen'>
            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Новый пользователь</h2>
                    
                        <button
                            className="save_button"
                            title="Сохранить"
                            disabled={!canSave}
                        >
                           Cохранить 
                        </button>
                    
                </div>
                <label className='title' htmlFor="username">
                    Имя пользователя: </label>
                <input
                    className={`inputsave ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className='title' htmlFor="password">
                    Пароль: </label>
                <input
                    className={`inputsave ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className='title' htmlFor="roles">
                    НАЗНАЧЕННЫЕ РОЛИ:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`inputsave ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
            </div>
        </div>
  )
}

export default NewUserForm