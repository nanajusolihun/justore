"use client";

import React, { Fragment, useContext, useEffect } from "react";
import { ButtonBG, ButtonOL } from "../Elements/Buttons";
import { adminNavOptions, navOptions } from "@/utils";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";


function NavItems({ isModalView = false, isAdminView, router }) {
  

  return (
    <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
      <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? "border-none" : "border border-gray-100"}`}>
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:text-blue-500"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:text-blue-500"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

const Navbar = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Font Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="slef-center text-2xl text-blue-600 font-bold whitespace-nowrap">
              JU Store
            </span>
          </div>
          {/* Submenu Navbar */}
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <ButtonBG 
                  disabled={false}
                  onClick={()=>router.push('/account')}
                >
                  {user.name}
                </ButtonBG>
                <ButtonBG 
                  disabled={false}
                  onClick={()=> setShowCartModal(true)}
                >
                  Cart
                </ButtonBG>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <ButtonBG 
                  disabled={false} 
                  type="submit"
                  onClick={() => router.push("/")}
                >
                  Client View
                </ButtonBG>
              ) : (
                <ButtonBG 
                  disabled={false}
                  onClick={() => router.push("/admin-view")}
                  type="submit"
                >
                  Admin View
                </ButtonBG>
              )
            ) : null}
            {isAuthUser ? (
              <ButtonBG 
                disabled={false} 
                type="submit" 
                variant="bg-red-600" 
                hover="hover:bg-red-700" 
                ring="focus:ring-red-600"
                onClick={handleLogout}
              >
                Logout
              </ButtonBG>
            ) : (
              <ButtonBG 
                disabled={false} 
                type="submit"
                onClick={() => router.push("/login")}
              >
                Login
              </ButtonBG>
            )}
            {/* Submenu Navbar */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center py-2.5 px-3 text-sm text-neutral-950 rounded-lg md:hidden hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
