import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar, DetailsHeader, Footers } from "../components";
import axios from 'axios';

export const Details = () => {
    const { id } = useParams()
    const url = `https://api.themoviedb.org/3/movie/${id}`
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
            <Navbar isAuth={isAuth} authData={authData} />
            <DetailsHeader movie={movie} />
            <Footers />
        </div>
    )
}
