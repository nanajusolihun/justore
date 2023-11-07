"use client";

import { ButtonBG } from "@/components/Elements/Buttons";
import InputComponent from "@/components/FormElements/InputComponent";
import { loginFormControls } from "@/utils";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { login } from "@/services/login";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialFormdata = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormdata);
    const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  console.log("INII", formData);

    function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin () {
    const res = await login(formData);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      // setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      // setComponentLevelLoader({ loading: false, id: "" });
    }
    console.log("LOGIN");
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between p-5 mt-5 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start py-14 px-10 bg-white shadow-xl rounded-xl relative z-10">
              <p className="w-full text-3xl font-bold text-center mb-5">LOGIN</p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem, index) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      key={index}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <ButtonBG 
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  LOGIN
                </ButtonBG>
                <div className="flex justify-center w-full gap-x-2">
                  <p className="text-black text-base ">Already Have an account?</p>
                  <Link href="/register" className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
