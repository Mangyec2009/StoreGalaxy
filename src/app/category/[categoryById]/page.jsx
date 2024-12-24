"use client"
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { softApi } from '@/config/config';
import { useStore } from '@/store/useStore';
import { primary, primaryLight } from '@/utils/theme';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
let fileAPI = softApi + "/images/";

const ById = () => {
    let {categoryById} = useParams();
    let {products, getProd, category, getCatId, plusCnt, AddCard} = useStore();
    useEffect(() => {
        getProd("CategoryId", categoryById);
        getCatId(categoryById);
    }, []);
    let local =null;

        if (typeof window !== 'undefined') {
            local = localStorage.getItem('access_token');
        }
    const bItems = [
        { label: 'Каталог товаров', href: '/category' },
        { label: category.categoryName },
    ];
    return <div className=''>
        <Breadcrumb items={bItems} />
        <div className="md:w-[100%] md:overflow-x-auto flex md:flex-nowrap flex-wrap gap-3 mt-[30px]">
        {category.subCategories?.map((el) => {
            return (
            <Link key={el.id} href={`/category/${categoryById}/${el.id}`}>
                <div
                    key={el.id}
                    className="bg-gray-100 text-black px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-200 transition-transform transform hover:-translate-y-1"
                >
                    <h1 className="text-sm font-medium whitespace-nowrap">{el.subCategoryName}</h1>
                </div>
            </Link>
            );
        })}
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
            />
        <div className='w-[100%] mx-auto mt-[60px] flex justify-between flex-wrap items-center'>
            {products?.map((el) => {
                return <div key={el.id} className="group flex flex-col md:w-[50%] mt-[15px] items-start p-4 rounded-lg bg-white w-64">
                    <Image
                        width={400}
                        height={100}
                        src={fileAPI + el.image}
                        alt={el.productName} 
                        className="w-full h-48 object-cover mb-3"
                        />
                    <div className="flex items-center mb-2">
                        {el.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded mr-2">
                                -{el.discount}%
                            </span>
                        )}
                        <span className="font-bold text-lg text-gray-900 mr-2">
                            {el.price} c.
                        </span>
                        {el.oldPrice && (
                            <span className="line-through text-gray-500 text-sm">
                                {el.oldPrice} c.
                            </span>
                        )}
                    </div>
                    <h1 className={`font-medium mb-3 group-hover:text-[#b98fe6]`}>{el.productName}</h1>
                    {!el.productInMyCart ? (
                            <button
                            style={{backgroundColor: primaryLight,}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = primary}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryLight}
                            onClick={() => {
                                !local ? 
                                router.push("/login")
                                : toast.promise(
                                    AddCard(el.id),
                                    {
                                        loading: 'Добавление...',
                                        success: <b>Добавлено в корзину!</b>,
                                        error: <b>Не удалось добавить.</b>,
                                    }
                                    ),
                                    plusCnt();
                                }}
                                className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                                >
                            <ShoppingCart className="w-[16px]" /> В корзину
                        </button>                        
                        ) : <button>
                                Уже в корзине
                            </button>}
                </div>
            })}
        </div>
    </div>
}

export default ById