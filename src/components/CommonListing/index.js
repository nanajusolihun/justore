"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";

export default function CommonListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  
  return (
    <section className="bg-white py-6 sm:py-10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
        <div className="mt-6 p-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 lg:mt-8">
          {data && data.length
            ? data.map((item, index) => (
                <article 
                  className=" cursor-pointer gap-10 relative w-full p-3 flex flex-col overflow-hidden rounded-xl shadow border cursor-pointe hover:bg-gray-50 hover:shadow-2xl hover:scale-105" 
                  key={index}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}