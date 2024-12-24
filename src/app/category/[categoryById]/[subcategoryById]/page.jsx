"use client"
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { softApi } from '@/config/config';
import { useStore } from '@/store/useStore';
import { primary, primaryDark, primaryLight, secondary, secondaryDark } from '@/utils/theme';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
let fileAPI = softApi + "/images/";


const SubById = () => {
    let {subcategoryById, categoryById} = useParams();
    let {products, getProd, category, getCatId, cartCnt, AddCard, plusCnt} = useStore();
    useEffect(() => {
        getProd("subCategoryId", subcategoryById);
        getCatId(categoryById);
    }, [subcategoryById]);
    const router = useRouter();
    let local = null;
    if (typeof window !== 'undefined') {
        local = localStorage.getItem('access_token');
    }
    const bItems = [
        { label: 'Каталог товаров', href: '/category' },
        { label: category.categoryName, href: `/category/${categoryById}` },
        { label: category.subCategories?.find((el) => el.id == subcategoryById)?.subCategoryName}
    ];
    return <div className='max-w-[1180px] mx-auto'>
        <Toaster
            position="top-right"
            reverseOrder={false}
            />
        <Breadcrumb items={bItems} />
        <div className='max-w-[1180px] mx-auto mt-[60px] flex justify-between flex-wrap items-center'>
            {products?.map((el) => {
                return <div key={el.id} className="group flex flex-col mt-[15px] items-start p-4 rounded-lg bg-white w-64">
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
                                );
                                plusCnt();
                                getProd("subCategoryId", subcategoryById);
                            }}
                        className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                    >
                        <ShoppingCart className="w-[16px]" /> В корзину
                    </button>                        
                    ) : <button
                    style={{backgroundColor: primaryLight,}}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = secondaryDark}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = secondary}
                    className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                >
                    <ShoppingCart className="w-[16px]" /> Уже в корзине
                </button> }
                </div>
            })}
        </div>
    </div>
}

export default SubById