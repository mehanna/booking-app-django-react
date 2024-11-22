import React from 'react'

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import RoomPage, { roomLoader } from './pages/RoomPage'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      {/*<Route path='/rooms/:id' element={<RoomPage />}/>*/}
     <Route path='/rooms/:id' element={<RoomPage />} loader={roomLoader}/>
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {

  return <RouterProvider router={router} />;

}

export default App

