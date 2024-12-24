import { AlignJustify, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HeaderMobile = () => {
  return <>
        <header className='w-[100%] hidden md:block fixed bottom-0 bg-white py-[15px]'>
            <div className='w-[90%] mx-auto flex items-center justify-between'>
                <Link href={"/profile"}>
                    <div className='text-[13px] flex flex-col items-center'>
                    <User />
                    Профиль
                    </div>
                </Link>
                <Link href={"/category"}>
                    <div className='text-[13px] flex flex-col items-center'>
                    <AlignJustify />
                    Каталог
                    </div>
                </Link>
                <Link href={"/cart"}>
                    <div className='text-[13px] flex flex-col items-center'>
                    <ShoppingCart />
                    Корзина
                    </div>
                </Link>
            </div>            
        </header>
  </>
}

export default HeaderMobile