import React, { useEffect, useState } from 'react';
import { Navbar, MainHeader, MainContents, Footers } from "../components";
import axios from 'axios';

const Home = () => {
  const url = 'https://api.themoviedb.org/3/trending/all/day';
  const [popularMovie, setPopularMovie] = useState(undefined);
  const categoryurl = 'https://api.themoviedb.org/3/genre/movie/list';
  const [category, setCategory] = useState(undefined);
  const [isAuth, setIsAuth] = useState(false);

  // handle auth
  useEffect(() => {
    const local = localStorage.getItem('auth_token')
    if(!local) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  })

  useEffect(() => {
    if (!popularMovie) {
      axios.get(url, {
        params: {
          api_key: '0c6b8abc212dabe5c621e9c560c5320e'
        }
      }).then((res) => {
        setPopularMovie(res.data);
      }).catch((error) => {
        console.log(error)
      })
    }
    if (!category) {
      axios.get(categoryurl, {
        params: {
          api_key: '0c6b8abc212dabe5c621e9c560c5320e'
        }
      }).then((res) => {
        setCategory(res.data);
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [popularMovie, category])

  if (!popularMovie || !category) return <>Loading...</>
  return (
    <div className='relative font-inter'>
      <Navbar isAuth={isAuth} />
      <MainHeader popularMovie={popularMovie} />
      <MainContents popularMovie={popularMovie} category={category} />
      <Footers />
    </div>
  )
}

export default Home;