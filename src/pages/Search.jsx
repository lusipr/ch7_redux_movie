import React, { useEffect, useState } from 'react';
import { Navbar } from "../components";
import axios from 'axios';

const Search = () => {
  const url = 'https://api.themoviedb.org/3/trending/all/day'
  const [movie, setMovie] = useState(undefined);

  useEffect(() => {
    if(!movie) {
      axios.get(url, {
        params: {
          api_key : '0c6b8abc212dabe5c621e9c560c5320e'
        }
      }).then((res) => {
        setMovie(res.data);
      }).catch((error) =>{
        console.log(error)
      })
    }
  }, [movie])

  if(!movie) return <>Loading...</>
  return (
    <div className='font-inter'>
      <Navbar />
    </div>
  )
}

export default Search;