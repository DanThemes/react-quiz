import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PageLayout from './components/PageLayout';
import Quiz from './components/Quiz';

import './app.scss';
import axios from 'axios';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data: { trivia_categories: categories } } = await axios.get('https://opentdb.com/api_category.php');
    console.log(categories)
    setCategories(categories);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, [])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home categories={categories} setSelectedCategory={setSelectedCategory} isLoading={isLoading} />} />
            <Route path="/quiz" element={<Quiz category={selectedCategory} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App