"use client"

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export default function GlobalState ({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      // const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setUser(userData);
      // setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}