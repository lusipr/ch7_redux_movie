import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, MainHeader, MainContents, Footers } from "../components";
import { getCategories, getPopularMovie } from '../feature/models/movies';

const Home = () => {
  const {popularMovie, categories, isLoading, isError} = useSelector((state) => state.movies);

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPopularMovie());
    dispatch(getCategories());
  }, [dispatch])

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error....</>
  return (
    <div className='relative font-inter'>
      <Navbar />
      <MainHeader popularMovie={popularMovie} />
      <MainContents popularMovie={popularMovie} category={categories} />
      <Footers />
    </div>
  )
}

export default Home;