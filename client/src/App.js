import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import MapComponent from './components/MapComponent';
import Auth from './features/auth/Auth';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';


const App = () => {

  return (
        <Routes>
          <Route path='/' element={<Layout/>} />
            <Route index element={<Public />} />
            <Route path='login' element={<Auth />} />
            
            <Route element={<PersistLogin />} >
              <Route element={<Prefetch />} >
                <Route path='dash' element={<DashLayout />} >

                  <Route index element={<Welcome />} />
                  <Route path='map' element={<MapComponent />} />
                  <Route path='users'>
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
                </Route> {/* End Dash */}
              </Route>
            </Route>
        </Routes>
  );
};

export default App;