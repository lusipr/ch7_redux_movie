import React, { useEffect, useState } from 'react';
import { Navbar, MovieCard, Footers } from "../components";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';

const Search = () => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const { id } = useParams();
  const [movie, setMovie] = useState(undefined);
  const [isAuth, setIsAuth] = useState(false);
  const [authData, setAuthData] = useState(undefined);

  // handle auth
  useEffect(() => {
    const local = localStorage.getItem('auth')
    if (!local) {
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
    axios.get(url, {
      params: {
        api_key: '0c6b8abc212dabe5c621e9c560c5320e',
        query: id.replace(/ /g, '+')
      }
    }).then((res) => {
      setMovie(res.data);
    }).catch((error) => {
      console.log(error)
    })
  }, [movie])

  if (!movie) return <>Loading...</>
  return (
    <div className='font-inter'>
      <Navbar isAuth={isAuth} authData={authData} />
      <div className='flex items-end justify-center min-h-[50vh]' style={{ backgroundImage: `url(${'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'})` }}>
        <div className='container block pb-10'>
          <h1 className='text-white text-6xl font-bold'>All Movies "{id}"</h1>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='container block mt-6'>
          <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
            <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
              Search Result "{id}"
            </h2>
          </div>
          <div>
            <Row
              className='gap-y-6 mt-8'
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 30
              }}
            >
              {movie["results"].filter((value, index) => index < 20).map((value) => {
                return <Col className='gutter-row' span={6}><MovieCard data={value} /></Col>
              })}
            </Row>
          </div>
        </div>
      </div>
      <Footers />
    </div>
  )
}

export default Search;