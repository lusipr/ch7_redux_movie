import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
    StarOutlined
} from '@ant-design/icons';

export const MovieCard = (props) => {
    const data = props.data;
    const [visible, setVisible] = useState(false);
    const image = "https://image.tmdb.org/t/p/original" + data["poster_path"];

    return (
        <motion.a
            href={`/movie/${data['id']}`}
            onHoverStart={e => { setVisible(true) }}
            onHoverEnd={e => { setVisible(false) }}
            className='relative flex items-end h-[500px] overflow-hidden'
        >
            <div
                className='absolute w-full h-full bg-cover bg-center rounded-xl hover:brightness-50 ease-in-out duration-500'
                style={{
                    backgroundImage: "url(" + image + ")"
                }}
            ></div>

            <AnimatePresence>
                {
                    visible ?
                        <motion.div
                            initial={{ opacity: 0, y: 200 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 200 }}
                            transition={{ ease: "linear" }}
                            className="px-6 mb-4 z-10"
                        >
                            <h1 className='text-white text-lg'>{
                                data["title"] ? data["title"] : data["name"]
                            }</h1>
                            <div className='flex gap-x-2'>
                                <StarOutlined style={{ fontSize: 20, color: '#e69b00' }} />
                                <p className='text-yellow-500'>{Number(data['vote_average']).toFixed(1)} / 10</p>
                            </div>
                            <p className='text-white'>{data['release_date']}</p>
                        </motion.div> : <></>
                }
            </AnimatePresence>
        </motion.a>
    )
}
