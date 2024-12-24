"use client";
import { softApi } from "@/config/config";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
let imageApi = softApi + "/images";

const Cart = () => {
  let { getCard, dataCard, deleteCard, deleteAllCard, incresNum, decresNum, cartCnt, defCnt } = useStore();
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("installment");

  useEffect(() => {
    getCard();
    defCnt();
  }, []);

  let cnt = 0;
  let cnt2=0

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl">
          Корзина <span className="text-gray-500 text-lg md:text-xs">товара</span>
        </h1>
        <button
          onClick={() => {
            deleteAllCard();
          }}
          className="text-blue-600"
        >
          Очистить корзину
        </button>
      </div>

      <div className="flex md:flex-col flex-row gap-6">
        <div className="w-2/3 md:w-[90%] space-y-6 mx-auto">
          {dataCard ? (
            <div>
              {dataCard.map((e) => (
                <div
                  key={dataCard.length}
                  className="bg-white rounded-lg shadow"
                >
                  <div className="p-4 border-b">
                    <h3 className="text-gray-600">Способ доставки</h3>
                    <p className="font-medium">Доставка от Izone accessories</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Общая сумма: 0 с.
                    </p>
                  </div>
                  {e.productsInCart.map((el) => (
                    <div
                      key={el.product.id}
                      className="p-4 flex items-start gap-4"
                    >
                      <Image
                        src={`${imageApi}/${el.product.image}`}
                        alt={el.product.productName}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium">
                          {el.product.productName}
                        </h3>
                        <p className="text-gray-600">{el.product.color}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <button  onClick={()=>{el.quantity != 1 &&
                              decresNum(el.id)
                            }} className="w-6 h-6 flex items-center justify-center border rounded">
                              -
                            </button>
                            <span>{el.quantity}</span>
                            <button onClick={()=>{
                              incresNum(el.id)
                            }} className="w-6 h-6 flex items-center justify-center border rounded">
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              deleteCard(el.id);
                            }}
                            className="text-gray-400"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>

                          </div>
                        <p className="font-medium mt-2">
                          {el.product.price} с.
                        </p>
                        <p className="text-sm text-yellow-600">
                          В рассрочку 5.1 с. / мес.
                        </p>
                       <p className="hidden"> {cnt2=(el.quantity)*el.product.price}{cnt+=cnt2}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div>No Products</div>
          )}
        </div>

        <div className="w-1/3 md:w-[90%] mx-auto">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg md:text-xs font-medium mb-4">Способ оплаты</h3>
            <div className="flex gap-2 mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded ${
                  paymentMethod === "installment"
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setPaymentMethod("installment")}
              >
                В рассрочку
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded ${
                  paymentMethod === "cash"
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                Наличными
              </button>
            </div>

            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Товары (2)</span>
                <span>3 945 с.</span>
              </div>
              <div className="flex justify-between">
                <span>Скидка</span>
                <span>0 с.</span>
              </div>
              <div className="flex justify-between">
                <span>Общая сумма доставки</span>
                <span>0 с.</span>
              </div>
              <div className="flex justify-between">
                <span>Комиссия за товары (2)</span>
                <span>1 453 с.</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-lg md:text-xs mt-4 pt-4 border-t">
              <span>Итого</span>
              <span>{cnt}</span>
            </div>

            <button className="w-full bg-yellow-400 text-white py-3 rounded-lg mt-4">
              Перейти к оформлению
            </button>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm">
              <p>
                Перед покупкой мобильных устройств рекомендуется проверить их
                статус: IMEI-кода в государственной системе идентификации
                мобильных средств электрической связи, набрав на устройстве
                USSD-команду *3366*IMEI#. Либо проверить IMEI-код устройства на
                едином портале www.imei.tj.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
