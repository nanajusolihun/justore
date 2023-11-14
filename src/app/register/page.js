"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
// import ComponentLevelLoader from "@/components/Loader/componentlevel";
// import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ButtonBG } from "@/components/Elements/Buttons";
import Link from "next/link";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

const isRegistered = false;

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } = useContext(GlobalContext);

  const router = useRouter();

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

    async function handleRegisterOnSubmit() {
      const data = await registerNewUser(formData);

      if (data.success) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsRegistered(true);
        setPageLevelLoader(false);
        setFormData(initialFormData);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
        setFormData(initialFormData);
      }
    }

    useEffect(() => {
      if (isAuthUser) router.push("/");
    }, [isAuthUser]);


  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between p-5 mt-5 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start py-14 px-10 bg-white shadow-xl rounded-xl relative z-10">
              <p className="w-full text-3xl font-bold text-center mb-5">
                {isRegistered 
                  ? "Registration Successfull !" 
                  : "Register an Account"}
              </p>
              {isRegistered ? (
                <ButtonBG>
                  LOGIN
                </ButtonBG>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormControls.map((controlItem, index) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        key={index}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        key={index}
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <ButtonBG                                       
                    disabled={!isFormValid()}
                    onClick={() => handleRegisterOnSubmit()}
                  >
                    REGISTER
                  </ButtonBG>
                  <div className="flex justify-center w-full gap-x-2">
                    <p className=" text-base ">Already Have an account?</p>
                    <Link href="/login" className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700">
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
