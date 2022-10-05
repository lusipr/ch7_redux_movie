import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieCard } from '../Card';

export const MainContents = (props) => {
  const imageurl = 'https://image.tmdb.org/t/p/original';
  const { popularMovie } = props;
  const { results } = popularMovie;

  return (
    <div className='flex justify-center mt-8'>
      <div className='container block'>
        <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
          <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
            Popular Movie
          </h2>
          <div className="xl:text-lg text-base flex items-center">
            See All Movie
          </div>
        </div>
        <div className="mt-6">
          <Swiper slidesPerView={4} spaceBetween={20}>
          {popularMovie["results"].filter((value, index) => index<20).map((value) => {
            return <SwiperSlide><MovieCard data={value} /></SwiperSlide>
          }
          )}
          </Swiper>
        </div>
      </div>

    </div >
  )
}