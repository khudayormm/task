import React from 'react'
import { Navigate } from 'react-router-dom'
import ResponsiveAppBar from './AppBar'

type Props = {
    children: React.ReactNode
    isLogin: boolean
}

const Layout = ({ children, isLogin }: Props) => {
    if (!isLogin) {
        return <Navigate to={'/'} />
      }
  return (
    <div>
      <ResponsiveAppBar />
        {children}
    </div>
  )
}

export default Layout