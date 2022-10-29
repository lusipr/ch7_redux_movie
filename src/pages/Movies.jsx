import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Navbar, MovieCard, Footers } from '../components';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../feature/models/movies';
import { useParams } from 'react-router-dom';


export const Movies = () => {
    // const url = 'https://api.themoviedb.org/3/discover/movie';
    // const [allMovies, setAllMovies] = useState();
    // const [aktifPage, setAktifPage] = useState(1);
    // const getAllMovies = (page) => {
    //     axios.get(url, {
    //         params: {
    //             api_key: '0c6b8abc212dabe5c621e9c560c5320e',
    //             page: page
    //         }
    //     }).then((res) => {
    //         setAllMovies(res.data)
    //         setAktifPage(page)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    // useEffect(() => {
    //     if (!allMovies) {
    //         getAllMovies(1)
    //     }
    // })

    const { allMovies, isLoading, isError } = useSelector((state) => state.movies);

    const dispatch = useDispatch()

    const {page} = useParams()
    const [aktifPage, setAktifPage] = useState(1);

    useEffect(() => {
        dispatch(getAllMovies(aktifPage));
    }, [dispatch])

    const handlePrev = () => {
        const prevPage = aktifPage !== 1 ? (aktifPage - 1) : aktifPage;
        dispatch(getAllMovies(prevPage));
        setAktifPage(prevPage);
    }

    const handleNext = () => {
        const nextPage = aktifPage !== 5 ? (aktifPage + 1) : aktifPage;
        dispatch(getAllMovies(nextPage));
        setAktifPage(nextPage);
    }

    const handlePageNumber = (index) => {
    dispatch(getAllMovies(index));
    setAktifPage(index);
    }

    if (isLoading) return <>Loading...</>
    if (isError) return <>Error....</>
    if (!allMovies.results) return <></>
    return (
        <>
            <div className='w-screen min-h-screen overflow-x-hidden'>
                <Navbar />
                <div className='flex items-end justify-center min-h-[50vh]' style={{ backgroundImage: `url(${'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'})` }}>
                    <div className='container block pb-10'>
                        <h1 className='text-white text-6xl font-bold'>All Movies</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='container block mt-6'>
                        <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
                            <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
                                All Movies
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
                                {allMovies["results"].filter((value, index) => index < 20).map((value) => {
                                    return <Col className='gutter-row' span={6}><MovieCard data={value} /></Col>
                                })}
                            </Row>
                            <div className='flex gap-x-2 mt-6'>
                                <button disabled={aktifPage === 1} onClick={handlePrev} className='w-10 h-10 border-2 border-gray-500 hover:border-red-600 text-black hover:text-red-600 duration-300'>{'<'}</button>
                                {new Array(5).fill().map((value, index) => {
                                    const isActive = index + 1 === aktifPage;
                                    if (isActive) return <button onClick={() => handlePageNumber(index + 1)} className='w-10 h-10 border-2 border-red-600 text-red-600 '>{index + 1}</button>
                                    return <button onClick={() => handlePageNumber(index + 1)} className='w-10 h-10 border-2 border-gray-500 hover:border-red-600 text-black hover:text-red-600 duration-300'>{index + 1}</button>
                                })}
                                <button disabled={aktifPage === 5} onClick={handleNext} className='w-10 h-10 border-2 border-gray-500 hover:border-red-600 text-black hover:text-red-600 duration-300'>{'>'}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footers />
            </div>
        </>
    )
}
