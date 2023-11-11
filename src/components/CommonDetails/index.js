"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";
import FormatCurrency from "@/utils/currency";
import { ButtonBG } from "../Elements/Buttons";
import { AiOutlineFieldTime } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {item && item.name}
            </h1>
            <div className="my-2 py-2 flex flex-col items-center justify-between space-y-4 space-x-6 sm:flex-row sm:space-y-0">
              <div className="flex justify-between gap-x-2 items-baseline">
                {/* Prie Deal */}
                <div >
                  { item.onSale === "yes" ? (
                    <p className="text-3xl font-semibold text-black">
                      {`${FormatCurrency(item.price - item.price * (item.priceDrop / 100))}`}
                    </p>
                  ) : <p className="text-3xl font-semibold text-black">
                      {`${FormatCurrency(item.price)}`}
                    </p> }
                </div>
                {/* Price Sale and sale */}
                <div className="flex items-center ">
                  {
                    item.onSale === "yes" 
                    ? (
                      <p className={`mr-3 text-base text-gray-400 ${item.onSale === "yes" ? "line-through" : ""}`}>
                        {FormatCurrency(item.price)}
                      </p>
                    )
                    : null
                  }
                  {item.onSale === "yes" ? (
                    <p className="text-sm py-0 px-2 text-red-500 rounded-xl font-semibold bg-rose-200"
                    >
                      {`${item.priceDrop}%`}
                    </p>
                  ) : null}
                </div>
              </div>                                    
            </div>
            <div className="flex flex-col w-full border-b-2 pt-3 pb-5 mb-4  border-gray-200">
              <ButtonBG
                disabled={false}
                onClick={() => handleAddToCart(item)}  
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Adding to Cart"}
                    color={"##fbbf24"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "ADD TO CART"
                )}
              </ButtonBG> 
            </div> 
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-x-2 text-left text-sm font-medium text-gray-600">
                <LiaShippingFastSolid size={20} color="#3b82f6" /> {item && item.deliveryInfo}
              </li>
              <li className="flex items-center gap-x-2 text-left text-sm font-medium text-gray-600">
                <AiOutlineFieldTime size={20} color="#3b82f6" /> {"Cancel anytime"}
              </li>
            </ul>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </a>
                </nav>
              </div>
              <div className="mt-6 flow-root sm:mt-12">
                {item && item.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification/>
    </section>
  );
}
