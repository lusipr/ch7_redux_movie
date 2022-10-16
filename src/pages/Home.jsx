import React, { useEffect, useState } from 'react';
import { Navbar, MainHeader, MainContents, Footers } from "../components";
import axios from 'axios';

const Home = () => {
  const url = 'https://api.themoviedb.org/3/trending/all/day';
  const [popularMovie, setPopularMovie] = useState(undefined);
  const categoryurl = 'https://api.themoviedb.org/3/genre/movie/list';
  const [category, setCategory] = useState(undefined);
  const [isAuth, setIsAuth] = useState(false);
  const [authData, setAuthData] = useState(undefined);

  // handle auth
  useEffect(() => {
    const local = localStorage.getItem('auth')
    if(!local) {
      setIsAuth(false)
    } else {
      const user = JSON.parse(local)
      const urlAuth = `https://notflixtv.herokuapp.com/api/v1/users/${user.id}`
      axios.get(urlAuth).then((res) => {
        setIsAuth(true)
        setAuthData(res.data)
        
      }).catch((error) => {
        console.log(error)
        setIsAuth(false)
      })
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

  if(!authData && isAuth) return <>Loading...</>

  if (!popularMovie || !category) return <>Loading...</>
  return (
    <div className='relative font-inter'>
      <Navbar isAuth={isAuth} authData={authData} />
      <MainHeader popularMovie={popularMovie} />
      <MainContents popularMovie={popularMovie} category={category} />
      <Footers />
    </div>
  )
}

export default Home;