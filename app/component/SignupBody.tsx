"use client";

import Image from "next/image";
import Car from "../../public/car.svg";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from 'next/navigation';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { app } from '../firebase.js'; // Ensure your Firebase config and initialization are here

export function SignupBody() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [plat, setPlat] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    nama: "",
    nim: "",
    plat: "",
    saldo: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const firestore = getFirestore(app); // Initialize Firestore

  const validate = () => {
    let newErrors = {
      nama: "",
      nim: "",
      plat: "",
      saldo: "",
      email: "",
      password: "",
    };

    if (!nama) {
      newErrors.nama = "Nama is required";
    }

    if (!nim) {
      newErrors.nim = "NIM is required";
    }

    if (!plat) {
      newErrors.plat = "Plat is required";
    }

    if (!saldo) {
      newErrors.saldo = "Saldo is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSignUp = async (event : any) => {
    event.preventDefault(); // Prevent default form submission
    const findErrors = validate();
    if (Object.values(findErrors).some(value => value !== "")) {
      setErrors(findErrors);
    } else {
      setLoading(true);
      try {
        const res = await signUp(email, password);
        const uid = res.user.uid;
        await setDoc(doc(collection(firestore, 'users'), uid), {
          uid: uid,
          nama: nama,
          nim: nim,
          plat: plat,
          saldo: Number(saldo),
          email: email,
          role: "pengguna",
          qrcode: uid,
          created_at: serverTimestamp(),
          updated_at: null,
        });
        router.replace("/profil"); // Corrected path
      } catch (error : any) {
        let newErrors : any = {
          email: "",
          password: "",
        };
        if (error.code === "auth/invalid-email") {
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
          <div className="w-5/6 h-5/6 mt-10 bg-white rounded-xl lg:w-3/5 lg:h-5/6">
            <p className="text-4xl text-center font-bold mt-10">Sign up for free!!</p>
            <form onSubmit={handleSignUp}>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-10 mx-12">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e) => setNama(e.target.value)}
                />
                {errors.nama && <span className="text-red-500">{errors.nama}</span>}
              </div>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                <label htmlFor="nim">NIM</label>
                <input
                  type="text"
                  id="nim"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e) => setNim(e.target.value)}
                />
                {errors.nim && <span className="text-red-500">{errors.nim}</span>}
              </div>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                <label htmlFor="platMotor">Plat Motor</label>
                <input
                  type="text"
                  id="platMotor"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e) => setPlat(e.target.value)}
                />
                {errors.plat && <span className="text-red-500">{errors.plat}</span>}
              </div>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                <label htmlFor="saldo">Saldo</label>
                <input
                  type="number"
                  id="saldo"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e : any) => setSaldo(e.target.value)}
                />
                {errors.saldo && <span className="text-red-500">{errors.saldo}</span>}
              </div>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="border-solid border-2 border-grey-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
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
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
              <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                <p className="text-center">sudah memiliki akun?<a href="/login" className="text-[#4A4AE4]"> login</a> disini</p>
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
