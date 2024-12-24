import React from 'react'

const CardProduct = () => {
    return <>
        <div key={el.id} className="group flex flex-col mt-[15px] items-start p-4 border rounded-lg shadow-md bg-white w-64">
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
            {!el.productInMyCart ? (
                <button
                style={{backgroundColor: primaryLight,}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = primary}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryLight}
                className="flex items-center gap-[5px] text-black font-medium text-[14px] py-2 px-4 rounded"
                >
                <ShoppingCart className="w-[16px]" /> В корзину
            </button>                        
            ) : null}
        </div>
    </>
}

export default CardProduct