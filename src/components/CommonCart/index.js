"use client";

import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../Loader/componentlevel";
import FormatCurrency from "@/utils/currency";
import { ButtonBG } from "../Elements/Buttons";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {

  const router = useRouter()

  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="-my-8">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        key={cartItem.id}
                      >
                        <div className="shrink-0">
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className="h-24 w-25 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                            </div>
                            <div className="mt-4 flex gap-y-3 gap-x-6 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                {FormatCurrency(cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price)}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-red-600 sm:order-2"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === cartItem._id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={"#ef4444"}
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  <div className="flex gap-x-1 w-full items-center hover:opacity-80">
                                    <RiDeleteBin5Line size={20} color="#ef4444" /> {"Remove"}
                                  </div>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">Your cart is Empty !</h1>
                )}
              </div>
              <div className="mt-6 border-t py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-black font-medium">
                    {FormatCurrency(cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0")}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg text-black font-medium">{FormatCurrency(0)}</p>
                </div>
                <div className="flex items-center justify-between border-b-2 space-y-4">
                  <p className="text-lg text-black font-semibold">Total</p>
                  <p className="text-lg text-black font-bold items-center">
                    {FormatCurrency(cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0")}
                  </p>
                </div>
                <div className="mt-10 text-center">
                  <ButtonBG
                    onClick={()=>router.push('/checkout')}
                    disabled={cartItems && cartItems.length === 0}                    
                  >
                    CHECKOUT
                  </ButtonBG>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
