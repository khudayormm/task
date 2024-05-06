import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateUserAndLogin from './pages/CreateUserAndLogin';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';


export default function App() {
  const [isLogin, ] = useState<boolean>(localStorage.getItem("key") && localStorage.getItem("secret") ? true : false)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={!isLogin ? <CreateUserAndLogin /> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={<Layout isLogin={isLogin}> <Dashboard /> </Layout>} />
      <Route path="/books" element={<Layout isLogin={isLogin}> <Books /> </Layout>} />
    </Routes>
  </BrowserRouter>
  );
}
