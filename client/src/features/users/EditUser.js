import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
  const { id } = useParams()

  const user = useSelector(state => selectUserById(state, id))

  const content = user ? <EditUserForm user = {user} /> : <p>Загрузка...</p>

  return content
}

export default EditUser