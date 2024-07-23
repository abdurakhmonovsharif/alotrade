import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ ind, category, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to='/products'
      state={{ category }}
      className='flex flex-row items-center justify-start gap-3 hover:bg-alotrade/10 pr-20 w-full p-1 rounded-lg '
    >
      <div
        style={{
          backgroundColor:
            ind % 2 == 0 ? "rgb(0 194 203 / 0.2)" : "rgb(249 115 22 / 0.15)",
        }}
        className='flex items-center justify-center p-2 rounded-full'
      >
        <img
          src={category?.image}
          alt='category'
          className='w-[30px] h-[30px] rounded-xl'
        />
      </div>
      <span>{category?.name}</span>

      <span className='text-center text-[13px] font-semibold'>
        {category?.label}
      </span>
    </Link>
  );
};

export default CategoryCard;
