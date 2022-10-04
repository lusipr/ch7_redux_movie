import React from 'react';
import { Carousel } from 'antd';

export const Header = (props) => {
    const imageurl = 'https://image.tmdb.org/t/p/original';
    const { popularMovie } = props;
    const { results } = popularMovie;

    return (
        <Carousel>
            <div
                className='relative w-screen h-screen overflow-hidden'>
                <img className='absolute' src={"https://image.tmdb.org/t/p/original" + results[0]["backdrop_path"]} alt="" />
            </div>
            <div
                className='relative w-screen h-screen overflow-hidden'>
                <img className='absolute' src={"https://image.tmdb.org/t/p/original" + results[1]["backdrop_path"]} alt="" />
            </div>
            <div
                className='relative w-screen h-screen overflow-hidden'>
                <img className='absolute' src={"https://image.tmdb.org/t/p/original" + results[2]["backdrop_path"]} alt="" />
            </div>
        </Carousel>
    )
}
