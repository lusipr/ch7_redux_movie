import React, { useEffect, useState } from 'react';
import { Navbar, Header, MainContents } from "../components";
import axios from 'axios';

const Home = () => {
  const url = 'https://api.themoviedb.org/3/trending/all/day'
  const [popularMovie, setPopularMovie] = useState(undefined);

  useEffect(() => {
    if(!popularMovie) {
      axios.get(url, {
        params: {
          api_key : '0c6b8abc212dabe5c621e9c560c5320e'
        }
      }).then((res) => {
        setPopularMovie(res.data);
      }).catch((error) =>{
        console.log(error)
      })
    }
  }, [popularMovie])

  if(!popularMovie) return <>Loading...</>
  return (
    <div className='font-inter'>
      <Navbar />
      <Header popularMovie={popularMovie} />
      <MainContents popularMovie={popularMovie} />
    </div>
  )
}

export default Home;