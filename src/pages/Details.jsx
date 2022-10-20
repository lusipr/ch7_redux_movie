import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar, DetailsHeader, Footers } from "../components";
import axios from 'axios';

export const Details = () => {
    const { id } = useParams()
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const [movie, setMovie] = useState(undefined)

    useEffect(() => {
        if (!movie) {
            axios.get(url, {
                params: {
                    api_key: '0c6b8abc212dabe5c621e9c560c5320e'
                }
            }).then((res) => {
                setMovie(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [movie])

    if (!movie) return <>Loading...</>
    return (
        <div className='font-inter'>
            <Navbar />
            <DetailsHeader movie={movie} />
            <Footers />
        </div>
    )
}
