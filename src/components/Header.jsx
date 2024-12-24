"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import { useStore } from "@/store/useStore";
import { primary, primaryDark, primaryLight, secondary } from "@/utils/theme";
import Link from "next/link";
import { MapPin, Menu, Search, ShoppingCart, UserRoundPen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header = () => {
    const { data, getData, products, getProd,cartCnt, defCnt } = useStore();
    const [activeCategory, setActiveCategory] = useState(null);
    let pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        getData();
    }, []);
    let local = null;
    if (typeof window !== 'undefined') {
        local = localStorage.getItem('access_token');
    }

  return (
    <>
    {pathname != "/login" && pathname!="registration" &&
      <header className="w-[100%] sticky z-30 top-[0px] p-[10px] bg-red-500 mx-auto" style={{background: 'linear-gradient(135deg, #1e1f47, #6a4b8c, #00b2d9)'}}>
            <div className="flex items-center sm:items-start gap-[15px] sm:flex-col justify-between max-w-[1180px] mx-auto ">
                <div className="w-[32%] flex items-center gap-[30px]">
                    <Link href={"/"}>   
                        <Image src={"/logo.png"} width={160} height={0} alt="" className="" />
                    </Link>
                    <Menubar className={`bg-[#b98fe6] md:hidden hover:bg-[#e9d4ff] transition-all duration-200`}>
                    <MenubarMenu>
                        
                        <MenubarTrigger className="px-[10px py-[5px] flex items-center gap-[10px]">
                            <Menu /> 

                            Каталог товаров</MenubarTrigger>
                        <MenubarContent className="bg-[#cea1ff]">
                        {data.map((el) => (
                            <MenubarSub
                            className="bg-[#e9d4ff]"
                            key={el.id}
                            onMouseEnter={() => setActiveCategory(el.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                            >
                            <div onClick={() => {router.push(`/category/${el.id}`), getProd("CategoryId", el.id)}}>
                                <MenubarSubTrigger>{el.categoryName}</MenubarSubTrigger>
                            </div>
                            <MenubarSubContent className="bg-[#5470ff]">
                                {el.subCategories.length > 0 ? el.subCategories?.map((elem) => {
                                    return <div key={elem.id} onClick={() => {router.push(`/category/${el.id}/${elem.id}`), getProd("SubcategoryId", elem.id)}}>
                                    <MenubarItem key={elem.id} className={`bg-[${secondary}]`}>{elem.subCategoryName}</MenubarItem>
                                    </div> 
                                }) : <MenubarItem className="text-[red] cursor-not-allowed">No products available</MenubarItem>}
                            </MenubarSubContent>
                            </MenubarSub>
                        ))}
                        </MenubarContent>
                    </MenubarMenu>
                    </Menubar>
                </div>
                <div className="flex items-center gap-[10px]">
                    <Input type="email" placeholder="Название товара или артукул" className="w-[370px] sm:w-[270px]" />
                    <Button type="submit" className={`bg-[${primary}]`}>
                        <Search className="text-[white]" />
                    </Button>
                </div>
                {!local ? <Link href={"/login"}>
                    <button>Вход</button>
                </Link> : <div className="flex md:hidden items-center gap-[30px]">
                        <div className="flex flex-col items-center">
                            <MapPin  className="text-[white]" />
                            <h1 className="text-[lightgray] text-[13px]">Душанбе</h1>
                        </div>
                    <Link href={"/my-profile"}>
                        <div className="flex flex-col items-center">
                            <UserRoundPen className="text-[white]" />
                            <h1 className="text-[lightgray] text-[13px]">Профиль</h1>
                        </div>
                    </Link>
                    <Link onClick={() => {
                            defCnt()
                        }}
                        href={"/cart"}
                    >
                        <div className="flex flex-col items-center relative">
                            {cartCnt != 0 &&
                                <div className="text-white absolute text-[13px] -top-[10px] left-[30px] rounded-[50%] bg-red-500 h-[20px] w-[20px] flex items-center justify-center">
                                    {cartCnt}
                                </div>}
                            <ShoppingCart  className="text-[white]" />
                            <h1 className="text-[lightgray] text-[13px]">Корзина</h1>
                        </div>
                    </Link>
                </div>}
            </div>
      </header>}
    </>
  );
};

export default Header;
