"use client"
import { softApi } from '@/config/config';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
let fileAPI = softApi + "/images/";

const ProductById = () => {
  let {productById} = useParams();
  let {getById, product} = useStore();
  useEffect(() => {
    getById(productById);
  }, [])
  return <>
      <div className='max-w-[1180px] mx-auto mt-[50px] h-[83vh]'>
        <div className='w-[100%] flex items-center justify-between h-[100%]'>
          <div className='w-[55%] flex items-center justify-center'>
            {/* <Image src={fileAPI + product.images?.[0].images} width={500} height={0} alt="" className='' /> */}
            {
              product && <img src={fileAPI + product?.images?.[0].images} alt="" className='w-[500px]' />
            }
          </div>
          <div className='w-[45%] h-full'>
              <h1 className='mt-[50px] text-[30px] font-medium'>{product.productName}</h1>
              <p className='mt-[10px] text-[gray] text-[14px] font-medium'>Код товара: {product.code}</p>
              <h2 className='mt-[20px] text-[35px] font-bold'>{product.price} c.</h2>
              <p>В рассрочку c. / мес.</p>
              <hr className='my-[15px]' />
              <p className='font text-[17px] mt-[20px] mb-[10px]'>
                <span className='text-[gray]'>Бренд </span> 
                {product.brand}
              </p>
              <p className='font text-[17px] mb-[10px]'>
                <span className='text-[gray]'>Описание: </span>
                {product.description}
              </p>
              <div className='font text-[17px] mb-[10px] flex items-center gap-[10px]'>
                <span className='text-[gray]'>Цвета: </span>
                <div className={`w-[30px] h-[30px] rounded-[50%]`}
                    style={{
                      background: product.color?.toLowerCase()
                    }}
                />
              </div>
          </div>
        </div>
      </div>
  </>
}

export default ProductById