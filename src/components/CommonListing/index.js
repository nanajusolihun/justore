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
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
        <div className="mt-6 p-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 lg:mt-10 bg-yellow-300">
          {data && data.length
            ? data.map((item, index) => (
                <article 
                  className="relative w-full p-2 flex flex-col overflow-hidden rounded-xl shadow-lg border cursor-pointe bg-green-300 hover:bg-slate-300" 
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