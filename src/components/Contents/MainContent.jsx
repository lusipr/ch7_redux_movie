import React from 'react';
import { Card } from "antd";

export const MainContents = (props) => {
  const imageurl = 'https://image.tmdb.org/t/p/original';
  const { popularMovie } = props;
  const { results } = popularMovie;

  return (
    <div className="grid gap-6 grid-cols-4 mt-6">
      <Card
        hoverable
        cover={
          <img
            alt=""
            src={"https://image.tmdb.org/t/p/original" + results[1]["poster_path"]}
          />
        }
      >
      </Card>
    </div>
  )
}