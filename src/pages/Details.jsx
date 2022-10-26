import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar, DetailsHeader, Footers } from "../components";
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../feature/models/movies';

export const Details = () => {
    const { details, isLoading, isError } = useSelector((state) => state.movies);

    const dispatch = useDispatch()

    const {id} = useParams()
    console.log(id)
    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch])

    if (isLoading) return <>Loading...</>
    if (isError) return <>Error....</>
    return (
        <div className='font-inter'>
            <Navbar />
            <DetailsHeader movie={details} />
            <Footers />
        </div>
    )
}
