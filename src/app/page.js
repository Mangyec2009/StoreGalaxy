"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { Poppins } from "next/font/google";
import { ShoppingCart } from "lucide-react";
import { primary, primaryLight, secondary, secondaryDark } from "@/utils/theme";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
let fileAPI = "https://store-api.softclub.tj/images/";
const poppins = Poppins({subsets: ["latin"], weight: "700", });

export default function Home() {
    let {products, getProdAll, brands, AddCard, getBrands, plusCnt} = useStore();
    useEffect(() => {
        getProdAll();
        getBrands();
    }, []);
    let local = null;

    if (typeof window !== 'undefined') {
        local = localStorage.getItem('access_token');
    }
    
    return <>
        <div className="max-w-[1180px] mx-auto mt-[50px]">
            <SwiperComponent />
            <Toaster
            position="top-right"
            reverseOrder={false}
            />
            <h1 className={`text-[30px] ${poppins} md:w-[90%] mx-auto`}>Рекомендуем к покупке</h1>
            <div className="w-full flex items-center justify-between md:justify-around flex-wrap mt-[30px]">
            {products?.slice(0, 12)?.map((el) => {
                return <div key={el.id} className="group flex flex-col mt-[15px] items-start p-4 border rounded-lg shadow-md bg-white w-64 md:w-[160px]">
                    <Link href={`/products/${el.id}`}>
                        <img
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
                        </Link>
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
                                }}
                                className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                                >
                            <ShoppingCart className="w-[16px]" /> В корзину
                        </button>                        
                        ) : <button 
                            style={{backgroundColor: secondaryDark,}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = secondary}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = secondaryDark}
                            className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                        >
                                Уже в корзине
                            </button>}
                    </div>
            })}
            </div>
            <h1 className={`text-[30px] ${poppins} mt-[50px]`}>Наши Бренды</h1>
            <div className="w-[100%] flex flex-wrap justify-between items-center">
                {brands.map((el) => {
                    return <div className="flex flex-col items-center w-[250px] mt-[15px]" key={el.id}>
                        <Image src={`/${el.brandName}.png`} width={500} className="w-[50%]" height={0} alt="qwe" />
                    </div>
                })}
            </div>
        </div>
    </>
}


