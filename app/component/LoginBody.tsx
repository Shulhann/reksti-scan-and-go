"use client";

import Image from "next/image";
import Car from "../../public/car.svg";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from 'next/navigation';

export function LoginBody() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter(); // Use router inside the component

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSignIn = async (event : any) => {
    event.preventDefault(); // Prevent default form submission
    const findErrors = validate();
    if (Object.values(findErrors).some(value => value !== "")) {
      setErrors(findErrors);
    } else {
      setLoading(true);
      try {
        await signIn(email, password);
        router.replace("/riwayat");
      } catch (error : any) {
        let newErrors = {
          email: "",
          password: "",
        };
        if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
          newErrors.email = "Email or password invalid.";
        } else {
          newErrors.email = "Something went wrong.";
        }
        setErrors(newErrors);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full bg-[#CDE8E5] h-screen">
      <div className="flex justify-between w-full h-screen">
        <div className="flex justify-center w-full h-screen">
          <div className="w-5/6 h-2/3 mt-10 bg-white rounded-xl lg:w-2/5 lg:h-2/3">
            <p className="text-4xl text-center font-bold mt-10">Login</p>
            <form onSubmit={handleSignIn}>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-10 mx-12">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-5 mx-12">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
              <div className="flex justify-center items-center gap-1.5 mt-10 mx-12">
                <button
                  type="submit"
                  className="text-white text-lg w-full font-medium bg-[#4D869C] py-1 rounded-2xl"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
              <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                <p className="text-center">atau</p>
              </div>
              <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                <button
                  type="button"
                  className="text-lg font-medium w-full py-1 rounded-2xl border-solid border-2 border-grey-400"
                >
                  Login dengan google
                </button>
              </div>
              <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                <p className="text-center">
                  belum memiliki akun?<a href="/signup" className="text-[#4A4AE4]"> signup</a> disini
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block lg:mt-20 lg:w-2/5">
          <Image src={Car} alt="Car" className="" />
        </div>
      </div>
    </div>
  );
}
