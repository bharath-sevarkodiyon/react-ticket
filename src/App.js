import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/pages/Home/home';
import Signup from './Components/validation/signup';
import Login from './Components/validation/login';
import ManageTicket from './Components/pages/ManageTicket/manageTicket';
import { TicketProvider } from './Components/pages/ticketProvider';
import ManageTeam from './Components/pages/manageTeam/manageTeam';
import { TeamProvider } from './Components/pages/teamProvider';
// import ProtectedRoute from './Components/protectedRoute';
function App() {
  // const isAuthenticated = !!localStorage.getItem('authToken');
  return (
    <TicketProvider>
      <TeamProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            {/* <Route 
  //           path='/home' 
  //           element={
  //             <ProtectedRoute isAuthenticated={isAuthenticated}>
  //               <Home/>
  //             </ProtectedRoute>
  //           }
  //         />
  //         <Route 
  //           path='/manageTicket' 
  //           element={
  //             <ProtectedRoute isAuthenticated={isAuthenticated}>
  //               <ManageTicket/>
  //             </ProtectedRoute>
  //           }
  //           <Route 
  //           path='/manageTeam' 
  //           element={
  //             <ProtectedRoute isAuthenticated={isAuthenticated}>
  //               <ManageTeam/>
  //             </ProtectedRoute>
  //           } 
  //         /> */}
            <Route path='/home' element={<Home />} />
            <Route path='/manageTicket' element={<ManageTicket />} />
            <Route path='/manageTeam' element={<ManageTeam />} />
          </Routes>
        </BrowserRouter>
      </TeamProvider>
    </TicketProvider>
  );
}

export default App;
