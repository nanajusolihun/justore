"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
// import { addToCart } from "@/services/cart";
// import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import { ButtonBG } from "@/components/Elements/Buttons";


export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal, setShowCartModal
  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function handleAddToCart(getItem) {
  setComponentLevelLoader({ loading: true, id: getItem._id });

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
    setShowCartModal(true)
  }
}

  return isAdminView ? (
    <div className="flex gap-2 justify-between items-center ">
      <ButtonBG
        disabled={false}
        variant="bg-gray-500"
        hover="hover:bg-gray-600"
        // onClick={() => {
        //   setCurrentUpdatedProduct(item);
        //   router.push("/admin-view/add-product");
        // }}
      >
        UPDATE
      </ButtonBG>
      <ButtonBG
        variant="bg-red-500"
        hover="hover:bg-red-600"
        ring="focus:bg-red-600"
        disabled={false}
        // onClick={() => handleDeleteProduct(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#fbbf24"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </ButtonBG>
    </div>
  ) : (
    <>
      <ButtonBG
        // onClick={() => handleAddToCart(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Adding to cart"}
            color={"#fbbf24"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "ADD TO CART"
        )}
      </ButtonBG>
    </>
  );
}