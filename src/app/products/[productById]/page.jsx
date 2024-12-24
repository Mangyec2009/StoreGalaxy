"use client"
import { softApi } from '@/config/config';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
let fileAPI = softApi + "/images/";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { primary, primaryLight, secondary, secondaryDark } from '@/utils/theme';
import toast, { Toaster } from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const ProductById = () => {
  let {productById} = useParams();
  let {getById, product, AddCard} = useStore();
  let [slideIndex, setSlideIndex] = useState(0);
  let local = null;
    if (typeof window !== 'undefined') {
        local = localStorage.getItem('access_token');
    }
  const router = useRouter();
  useEffect(() => {
    getById(productById);
  }, [])
  return <>
        <Toaster
            position="top-right"
            reverseOrder={false}
            />
      <div className='max-w-[1180px] mx-auto mt-[50px] h-[83vh]'>
        <div className='w-[100%] flex items-center justify-between h-[100%]'>
          <div className='w-[55%] flex items-center justify-center'>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
            onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)} // для обновления индекса слайда
          >
            {product?.images?.map((el) => (
              <SwiperSlide key={el.id}>
                <img src={fileAPI + el.images} alt="" className="w-[500px]" />
              </SwiperSlide>
            ))}
            
            {/* Навигация и счетчик слайдов снизу */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <div className="swiper-pagination"></div>
              <div className="text-sm">
                {slideIndex + 1} / {product?.images?.length}
              </div>
            </div>
          </Swiper> 
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
              {!product.productInMyCart ? (
                            <button
                            style={{backgroundColor: primaryLight,}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = primary}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryLight}
                            onClick={() => {
                                !local ? 
                                router.push("/login")
                                : toast.promise(
                                    AddCard(product.id),
                                    {
                                        loading: 'Добавление...',
                                        success: <b>Добавлено в корзину!</b>,
                                        error: <b>Не удалось добавить.</b>,
                                    }
                                    );
                                    plusCnt();
                                }}
                                className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                                >
                            <ShoppingCart className="w-[16px]" /> В корзину
                        </button>                        
                        ) : <button 
                            style={{backgroundColor: secondaryDark,}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = secondaryDark}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = secondaryDark}
                            className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                        >
                                Уже в корзине
                            </button>}
          </div>
        </div>
      </div>
  </>
}

export default ProductById