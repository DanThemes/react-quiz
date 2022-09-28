import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = ({ categories, setSelectedCategory}) => {
  const navigate = useNavigate();
  
  const handleCategorySelect = e => {
    setSelectedCategory({ id: e.target.dataset.id, name: e.target.textContent })
    navigate('/quiz');
  }

  return (
    <div>
      <h1>Home</h1>

      {categories && categories.map(category => {
        return <p key={category.id} onClick={handleCategorySelect} data-id={category.id}>{category.name}</p>
      })}
    </div>
  )
}

export default Home