import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieCard } from '../Card';
import {
  ArrowRightOutlined
} from '@ant-design/icons';
import { Category } from '../Tooltip';


export const MainContents = (props) => {
  const { popularMovie } = props;

  return (
    <div className='flex flex-col items-center justify-center mt-8 gap-y-10'>
      <div className='container block'>
        <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
          <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
            Popular Movie
          </h2>
          <a type='button' href='/movie' className="xl:text-lg text-base flex items-center text-red-700 gap-2">
            See All Movie <ArrowRightOutlined />
          </a>
        </div>
        <div className="mt-6">
          <Swiper slidesPerView={4} spaceBetween={20}>
            {
              !popularMovie.results ? <></> : <>{
                popularMovie["results"].filter((value, index) => index < 20).map((value) => {
                  return <SwiperSlide><MovieCard data={value} /></SwiperSlide>
                })
              }</>
            }
          </Swiper>
        </div>
      </div>

      <div className='container block mt-6'>
        <div className="flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
          <h2 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight">
            Browse by Category
          </h2>
          <a type='button' href='/movie' className="xl:text-lg text-base flex items-center text-red-700 gap-2">
            See All Movie <ArrowRightOutlined />
          </a>
        </div>
        <div>
          <Category category={props.category} />
          <div className='mt-10'>
            <Swiper slidesPerView={4} spaceBetween={20}>
              {
                !popularMovie.results ? <></> : <>
                  {
                    popularMovie["results"].filter((value, index) => index < 20).map((value) => {
                      return <SwiperSlide><MovieCard data={value} /></SwiperSlide>
                    })
                  }
                </>
              }
            </Swiper>
          </div>
        </div>
      </div>
    </div >
  )
}