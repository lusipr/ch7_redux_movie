import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Category = (props) => {
    const { category } = props;

    return (
        <Swiper slidesPerView={8} spaceBetween={10}>
            {
                !category.genres ? <></> : <>
                    {
                        category["genres"].map((value) => {
                            return <SwiperSlide>
                                <div>
                                    <a
                                        href={`/genre/${value['id']}`}
                                        type={"button"}
                                        className='flex justify-center items-center w-full py-2 h-full border-2 border-red-600 rounded-full text-red-600 hover:border-transparent hover:bg-red-600 hover:text-white duration-300'
                                    >{value["name"]}</a>
                                </div>
                            </SwiperSlide>
                        })
                    }
                </>
            }
        </Swiper>
    )
}
