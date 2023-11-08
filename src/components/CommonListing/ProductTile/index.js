"use client";

import { useRouter } from "next/navigation";
import FormatCurrency from "@/utils/currency";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div  onClick={()=> router.push(`/product/${item._id}`)}>
      <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product image"
          className="h-full w-full object-cover rounded-lg transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-rose-500">
          <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-full flex-col items-start justify-between">
        <div className="mb-2 flex flex-col">
          {/* Prie Deal */}
          {item.onSale === "yes" ? (
            <p className="text-lg font-semibold text-black">
              {`${FormatCurrency(item.price - item.price * (item.priceDrop / 100))}`}
            </p>
          ) : null}
          {/* Price Sale and sale */}
          <div className=" flex items-center ">
            <p className={`mr-3 text-sm text-gray-400 ${
                item.onSale === "yes" ? "line-through" : ""
              }`}
            >
              {`${FormatCurrency(item.price)}`}
            </p>
            {item.onSale === "yes" ? (
            <p className="text-sm py-0 px-1 text-red-500 rounded-xl font-semibold bg-rose-200"
            >
              {`${item.priceDrop}%`}
            </p>
          ) : null}
          </div>             
          
        </div>
        <h3 className="md-2 text-black text-base hover:scale-105">{item.name}</h3>
        <h3 className="md-2 text-gray-400 text-sm uppercase">{item.category}</h3>
      </div>
    </div>
  );
}