"use client"
import { useStore } from '@/store/useStore';
import Link from 'next/link';
import React, { useEffect } from 'react'

const Categoyr = () => {
  let {data, getData} = useStore();
  useEffect(() => {
    getData();
  }, [])
  return <>
      <div className='max-w-[1180px] mx-auto'>
        <h1 className='text-[35px] font-medium mt-[20px]'>Каталог товаров</h1>
        <div className='flex flex-wrap justify-between'>
            {data.map((el) => {
              return <Link href={`/category/${el.id}`} key={el.id} className='w-[250px] h-[70px] border-[2px] p-[10px] border-[black] rounded mt-[20px]'>
                  <h1>{el.categoryName}</h1>
              </Link>
            })}
        </div>
      </div>
  </>
}

export default Categoyr