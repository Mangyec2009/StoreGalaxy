"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useStore } from '@/store/useStore';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  let { minMax, getMinMax, getByPrice, brands, getBrands, getProd } = useStore();
  let {categoryById, subcategoryById} = useParams();
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [modal, setModal] = useState(false);
  let pathname = usePathname();
  console.log(pathname);
  const [selectedBrands, setSelectedBrands] = useState([]);

  //getProd("Name of Filter", "id of filter")
  useEffect(() => {
    getMinMax();
    getBrands();
  }, []);


  const handleFilter = (e) => {
    e.preventDefault();
    const minValue = parseFloat(e.target["min"].value) || min;
    const maxValue = parseFloat(e.target["max"].value) || max;

    if (minValue <= maxValue) {
      getByPrice(minValue, maxValue);
    } else {
      setMax(minValue);
    }
  };


  return (
    <>
      <div className="max-w-[1180px] md:w-[90%] mx-auto flex md:flex-col mt-[20px]">
        <div className="w-[25%] h-screen md:hidden">
          <div className="w-[85%] mx-auto h-screen overflow-auto">
            <h3 className="mt-[50px]">Цена</h3>
            <form className="w-full flex justify-between mt-[10px]" onSubmit={handleFilter}>
              <input
                type="number"
                name="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-[45%] border px-[7px] rounded-lg py-[10px]"
                placeholder={`От ${minMax.minPrice}`}
              />
              <input
                type="number"
                name="max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-[50%] border px-[7px] rounded-lg py-[10px]"
                placeholder={`До ${minMax.maxPrice}`}
              />
              <button
                type="submit"
                className="hidden"
              ></button>
            </form>
            <h3 className='mt-[50px]'>Бренд</h3>
            <div className='mt-[10px]'>
              {brands.map((el) => {
                return (
                  <div className='flex gap-[10px]' key={el.id}>
                    <input
                      type="checkbox"
                      onChange={(e) => {e.target.checked ? getProd("BrandId", el.id) : (pathname == `/category/${categoryById}` ? getProd("CategoryId", categoryById) : getProd("SubcategoryId", subcategoryById) )}}
                    //   checked={selectedBrands.includes(el.id)}
                    />
                    <h2>{el.brandName}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='hidden md:block'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Фильтры</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>
                Фильтры
              </DialogTitle>
            <div className="w-[90%]">
          <div className="w-[85%] mx-auto overflow-auto">
            <h3 className="mt-[50px]">Цена</h3>
            <form className="w-full flex justify-between mt-[10px]" onSubmit={handleFilter}>
              <input
                type="number"
                name="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-[45%] border px-[7px] rounded-lg py-[10px]"
                placeholder={`От ${minMax.minPrice}`}
              />
              <input
                type="number"
                name="max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-[50%] border px-[7px] rounded-lg py-[10px]"
                placeholder={`До ${minMax.maxPrice}`}
              />
              <button
                type="submit"
                className="hidden"
              ></button>
            </form>
            <h3 className='mt-[50px]'>Бренд</h3>
            <div className='mt-[10px]'>
              {brands.map((el) => {
                return (
                  <div className='flex gap-[10px]' key={el.id}>
                    <input
                      type="checkbox"
                      onChange={(e) => {e.target.checked ? getProd("BrandId", el.id) : (pathname == `/category/${categoryById}` ? getProd("CategoryId", categoryById) : getProd("SubcategoryId", subcategoryById) )}}
                    //   checked={selectedBrands.includes(el.id)}
                    />
                    <h2>{el.brandName}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
            </DialogContent>
          </Dialog>
          </div>
        <div className="w-[75%] md:w-[100%] mx-auto p-[15px]">{children}</div>
      </div>
    </>
  );
};

export default Layout;
