"use client";

import { ButtonBG } from "@/components/Elements/Buttons";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FormatCurrency from "@/utils/currency";
import Image from "next/image";
import banner from "@/app/assets/images/hero.jpg"
import men from "@/app/assets/images/men.jpg"
import women from "@/app/assets/images/women.jpg"
import kids from "@/app/assets/images/kids.jpg"

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10 px-16">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto lg:gap-8 xl:gap-0 lg:p-12 lg:grid-cols-12 bg-sky-100 shadow rounded-lg">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Best Fashion Collection</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
              Jadikan kegiatan keseharianmu dengan desain fashion trendy.
            </p>
            <ButtonBG
              disabled={false}
              type="button"
              variant="bg-blue-500"
              hover="hover:bg-blue-600"
              onClick={() => router.push("/product/listing/all-products")}
            >
              EXPLORE SHOP COLLECTIONS
            </ButtonBG>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src={banner}
              width={350}
              height={270}
              alt="Explore Shop Collection"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-blue-100 shadow rounded-lg place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Summer Sale Collection</h2>
                </div>
                <div className="mt-5">
                  <ButtonBG
                    disabled={false}
                    variant="bg-blue-500"
                    hover="hover:bg-blue-600"
                    onClick={() => router.push("/product/listing/all-products")} 
                  >
                    Shop ALL
                  </ButtonBG>               
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 2)
                      .map((productItem) => (
                        <li 
                          key={productItem._id}
                          onClick={() => router.push(`/product/${productItem._id}`)} 
                          className="cursor-pointer shadow rounded-lg p-4 bg-gray-100" 
                        >
                          <div>
                            <img 
                              src={productItem.imageUrl} 
                              alt="Sale Product Item" 
                              className="object-cover w-full rounded-xl aspect-square" 
                            />
                          </div>
                          <div className="mt-3 flex flex-col">
                            <h3 className="font-semibold text-gray-900">{productItem.name}</h3>
                            <p className="mr-3 mt-1 text-lg font-bold text-gray-800">
                              {FormatCurrency(productItem.price)}
                            </p>
                            <div className="text-red-700 flex items-center">
                              <div>
                                <p className={`mr-3 text-base text-gray-400 ${productItem.onSale === "yes" ? "line-through" : " "}`}>
                                {FormatCurrency(productItem.price)}
                              </p>
                              </div>
                              <div className="bg-rose-200 text-sm py-1 px-2 rounded-full">
                                {`${productItem.priceDrop}%`}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">SHOP BY CATEGORY</h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <Image
                  src={kids}
                  width={300}
                  height={300}
                  alt="kids"
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white">KIDS</h3>
                  <ButtonBG 
                    onClick={() => router.push("/product/listing/kids")}
                    disabled={false} 
                  >
                    SHOP NOW
                  </ButtonBG>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <Image
                  src={women}
                  width={300}
                  height={300}
                  alt="women"
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white">WOMEN</h3>
                  <ButtonBG 
                    onClick={() => router.push("/product/listing/women")} 
                    disabled={false}
                  >
                    SHOP NOW
                  </ButtonBG>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <Image
                  src={men}
                  width={700}
                  height={700}
                  alt="men"
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white">MEN</h3>
                  <ButtonBG 
                    onClick={() => router.push("/product/listing/men")}
                    disabled={false}
                  >
                    SHOP NOW
                  </ButtonBG>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
