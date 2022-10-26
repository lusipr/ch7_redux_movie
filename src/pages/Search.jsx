import React, { useEffect, useState } from 'react';
import { Navbar, MovieCard, Footers } from "../components";
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../feature/models/movies';

const Search = () => {
  const {search, isLoading, isError} = useSelector((state) => state.movies);

  const dispatch = useDispatch()

  const {id} = useParams()

  useEffect(() => {
    dispatch(getSearch(id));
  }, [dispatch])

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error....</>
  if(!search.results) return <></>
  return (
    <div className='font-inter'>
      <Navbar />
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
              {search["results"].filter((value, index) => index < 20).map((value) => {
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