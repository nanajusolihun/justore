"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import FormatCurrency from "@/utils/currency";
import { ButtonBG } from "../Elements/Buttons";

export default function CartModal() {
  const { showCartModal, setShowCartModal, cartItems, setCartItems, user, setComponentLevelLoader, componentLevelLoader } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price: item.productID.onSale === "yes" ? parseInt((item.productID.price - item.productID.price * (item.productID.priceDrop / 100)).toFixed(2)) : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }

    console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={cartItem && cartItem.productID && cartItem.productID.imageUrl} alt="Cart Item" className="h-full w-full object-cover object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{cartItem && cartItem.productID && cartItem.productID.name}</a>
                      </h3>
                    </div>
                    <p className="mt-1 text-base font-bold text-gray-900">{FormatCurrency(cartItem && cartItem.productID && cartItem.productID.price)}</p>
                  </div>
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <button type="button" className="font-medium text-red-600 sm:order-2" onClick={() => handleDeleteCartItem(cartItem._id)}>
                      {componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader text={"Removing"} color={"#ef4444"} loading={componentLevelLoader && componentLevelLoader.loading} />
                      ) : (
                        <div className="flex gap-x-2 w-full items-center hover:opacity-80">
                          <RiDeleteBin5Line size={20} color="#ef4444" /> {"Remove"}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <div className="flex flex-col p-2">
            <div className="my-1 w-full">
              <ButtonBG
                disabled={false}
                onClick={() => {
                  router.push("/cart");
                  setShowCartModal(false);
                }}
              >
                GO TO CART
              </ButtonBG>
            </div>
            <div className="my-1 w-full">
              <ButtonBG
                disabled={cartItems && cartItems.length === 0}
                type="button"
                onClick={() => {
                  router.push("/checkout");
                  setShowCartModal(false);
                }}
              >
                CHECKOUT
              </ButtonBG>
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-base text-blue-500 hover:text-blue-700">
            <button type="button" className="font-semibold text-base">
              Continue Shopping
              <span aria-hidden="true" className="font-semibold text-lg"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
