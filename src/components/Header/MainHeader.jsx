import React from 'react';
import { Carousel } from 'antd';
import {
    PlayCircleOutlined
} from '@ant-design/icons';

export const MainHeader = (props) => {
    const imageurl = 'https://image.tmdb.org/t/p/original';
    const { popularMovie } = props;
    const { results } = popularMovie;

    return (
        <Carousel>
            {results
                .filter((value, index) => index < 5)
                .map((value) => {
                    const img = "https://image.tmdb.org/t/p/original" + value["backdrop_path"];

                    return (
                        <div className='h-full'>
                            <div
                                className='flex justify-center items-center relative w-screen h-screen bg-cover bg-center overflow-hidden'
                                style={{
                                    backgroundImage: "url(" + img + ")"
                                }}
                            >
                                <div className='container block z-40'>
                                    <h1 className='text-white text-6xl'>{value["title"] ? value["title"] : ["name"]}</h1>
                                    <p className='text-white text-lg w-1/2'>{value["overview"].slice(0, 200)}.....</p>
                                    <a href={!value['video'] ? '#' : value['video']} className='hover:text-white flex justify-center w-fit items-center px-8 py-3 h-full bg-red-600 rounded-full text-white font-bold gap-x-2'><PlayCircleOutlined /> WATCH TRAILER</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </Carousel>
    )
}
