import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="main-header">
      <div>Logo</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  )
}

export default Header