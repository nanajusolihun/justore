"use client";

import { ButtonBG } from "@/components/Elements/Buttons";
import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { RiSave3Line, RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai"

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter()

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">{/* we have render random user image here */}</div>
            <div className="flex flex-col flex-1 mb-2">
              <h4>
                Full Name: <span className="text-base font-semibold text-center md:text-left">{user?.name}</span>
              </h4>
              <p>Email: {user?.email}</p>
              <p>Role: {user?.role}</p>
            </div>
            <div className="w-60">
            <ButtonBG 
              disabled={false} 
              onClick={() => router.push("/orders")}
            >
              VIEW ORDER
            </ButtonBG>
            </div>
            <div className="mt-6">
              <h1 className="font-bold text-lg">Your Addresses :</h1>
              {pageLevelLoader ? (
                <PulseLoader 
                  color={"#fbbf24"} 
                  loading={pageLevelLoader} 
                  size={15} 
                  data-testid="loader" 
                />
              ) : (
                <div className="mt-4 flex flex-col gap-4 ">
                  {addresses && addresses.length ? (
                    addresses.map((item, index) => (
                      <div 
                        className="border p-5 border-blue-600 rounded-xl shadow" 
                        key={index}
                      >
                        <p>Name : <span className="text-base font-semibold">{item.fullName}</span></p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalCode}</p>
                        <div className="flex justify-end gap-x-4 w-full">
                          <ButtonBG 
                            disabled={false} 
                            onClick={() => handleUpdateAddress(item)}
                          >
                            <div className="flex gap-x-1 w-full">
                              <FiEdit size={20} /> UPDATE
                            </div>
                          </ButtonBG>
                          <ButtonBG 
                            disabled={false} 
                            onClick={() => handleDelete(item._id)}
                            variant = "bg-red-600"
                            hover = "hover:bg-red-700"
                            ring = "focus:ring-red-600"
                          >
                            {componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === item._id ? (
                              <ComponentLevelLoader 
                                text={"Deleting"} 
                                color={"#fbbf24"} 
                                loading={componentLevelLoader && componentLevelLoader.loading} />
                            ) : (
                              <div className="flex gap-x-1 w-full">
                                <RiDeleteBin5Line size={20} /> DELETE
                              </div>
                            )}
                          </ButtonBG>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No address found ! Please add a new address below</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-6 w-60">
              <div>
                <ButtonBG 
                  disabled={false} 
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  {showAddressForm ? "HIDE ADDRESS FORM" : "ADD NEW ADDRESS"}
                </ButtonBG>
              </div>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col my-5 justify-center pt-4 items-center">
                <div className="w-full my-5 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <div className="flex justify-end items-center w-full mt-8">
                  <ButtonBG 
                    disabled={false} 
                    onClick={handleAddOrUpdateAddress}
                  >
                    {componentLevelLoader && componentLevelLoader.loading ? (
                      <ComponentLevelLoader 
                        text={"Saving"} 
                        color={"#fbbf24"} 
                        loading={componentLevelLoader && componentLevelLoader.loading} />
                    ) : (
                      <div className="flex gap-x-1 w-full font-bold px-6">
                        <RiSave3Line size={20} /> SAVE
                      </div>
                    )}
                  </ButtonBG>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
