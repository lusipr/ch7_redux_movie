import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Navbar, MovieCard, Footers } from '../components';
import { Category } from '../components/Tooltip';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';

export const Genre = () => {
    const url = 'https://api.themoviedb.org/3/discover/movie';
    const categoryurl = 'https://api.themoviedb.org/3/genre/movie/list';
    const [category, setCategory] = useState(undefined);
    const { id } = useParams();
    const [genre, setGenre] = useState();
    const [aktifPage, setAktifPage] = useState(1);


    const getGenre = (page) => {
        axios.get(url, {
            params: {
                api_key: '0c6b8abc212dabe5c621e9c560c5320e',
                with_genres: id,
                page: page
            }
        }).then((res) => {
            setGenre(res.data)
            setAktifPage(page)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (!genre) {
            getGenre(1)
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
    })

    if (!genre || !category) return <p>Loading....</p>
    const categoryName = category['genres'].filter((value) => value.id === Number(id))[0]['name']
    return (
        <>
            <div className='w-screen min-h-screen overflow-x-hidden'>
                <Navbar />
                <div className='flex items-end justify-center min-h-[50vh]' style={{ backgroundImage: `url(${'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'})` }}>
                    <div className='container block pb-10'>
                        <h1 className='text-white text-6xl font-bold'>Genre : {categoryName}</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='container block mt-6'>
                        <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
                            <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
                                Browse by Category
                            </h2>
                        </div>
                        <div>
                            <Category category={category} />
                            <Row
                                className='gap-y-6 mt-8'
                                gutter={{
                                    xs: 8,
                                    sm: 16,
                                    md: 24,
                                    lg: 30
                                }}
                            >
                                {genre["results"].filter((value, index) => index < 20).map((value) => {
                                    return <Col className='gutter-row' span={6}><MovieCard data={value} /></Col>
                                })}
                            </Row>
                            <div className='flex gap-x-2 mt-6'>
                                <button disabled={aktifPage === 1} onClick={() => getGenre(aktifPage !== 1 ? aktifPage - 1 : aktifPage)} className='w-10 h-10 border-2 border-gray-500 hover:border-red-600 text-black hover:text-red-600 duration-300'>{'<'}</button>
                                {new Array(2).fill().map((value, index) => {
                                    const isActive = index + 1 === aktifPage;
                                    if (isActive) return <button onClick={() => getGenre(index + 1)} className='w-10 h-10 border-2 border-red-600 text-red-600 '>{index + 1}</button>
                                    return <button onClick={() => getGenre(index + 1)} className='w-10 h-10 border-2 border-gray-500 hover:border-red-600 text-black hover:text-red-600 duration-300'>{index + 1}</button>
                                })}
                                <button disabled={aktifPage === 2} onClick={() => getGenre(aktifPage !== 2 ? aktifPage + 1 : aktifPage)} className='w-10 h-10 border-2 border-gray-500 hover:border-red-600 text-black hover:text-red-600 duration-300'>{'>'}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footers />
            </div>
        </>
    )
}
