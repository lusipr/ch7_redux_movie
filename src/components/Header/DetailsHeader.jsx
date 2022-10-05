import React from 'react';
import {
    PlayCircleOutlined, StarOutlined
} from '@ant-design/icons';

export const DetailsHeader = (props) => {
    const imageurl = 'https://image.tmdb.org/t/p/original';
    const { movie } = props;

    return (
        <div className='h-full'>
            <div
                className='flex justify-center items-center relative w-screen h-screen bg-cover bg-center overflow-hidden'
                style={{
                    backgroundImage: "url(" + imageurl + movie['backdrop_path'] + ")"
                }}
            >
                <div className='container block z-40'>
                    <h1 className='text-white text-6xl'>{movie["title"] ? movie["title"] : ["name"]}</h1>
                    <span className='text-white text-lg'>{movie["genres"][0]["name"]}</span>
                    <p className='text-white text-lg w-1/2 mt-6'>{movie["overview"]}</p>
                    <div className='flex gap-x-2'>
                        <StarOutlined style={{ fontSize: 20, color: '#e69b00' }} />
                        <p className='text-white'>{Number(movie['vote_average']).toFixed(1)} / 10</p>
                    </div>
                    <a href={!movie['video'] ? '#' : movie['video']} className='flex justify-center w-fit items-center px-8 py-3 h-full bg-red-600 rounded-full text-white font-bold gap-x-2'><PlayCircleOutlined /> WATCH TRAILER</a>
                </div>
            </div>
        </div>
    )
}
