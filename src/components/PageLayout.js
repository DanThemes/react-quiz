import React from 'react'
import { Outlet } from 'react-router-dom'
import Content from './Content'
import Header from './Header'

const PageLayout = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </>
  )
}

export default PageLayout