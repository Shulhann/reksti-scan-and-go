"use client";

import Image from "next/image"
import Icon from "../../public/icon.svg"
import Menu from "../../public/Menu.svg"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthProvider";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLogin, signOut, user} = useAuth();

    const toggleNavbar = () =>{
        setIsOpen(!isOpen);
    }
    const handleLogout = () => {
        signOut();
    }

    const notLogin = [
        {
            name: "About",
            link: "/"
        }
    ]
    const userLogin = [
        {
            name: "Profil",
            link: "/profil"
        },
        {
            name: "Riwayat",
            link: "/riwayat"
        }
    ]
    const adminLogin = [
        {
            name: "Pengguna",
            link: "/pengguna"
        },
        {
            name: "Riwayat",
            link: "/riwayat"
        }
    ]

    return (
        <nav className="flex w-full bg-[#7AB2B2]">
            <div className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
                <div className="flex items-center gap-x-14">
                    <div>
                        <Image src={Icon} alt="Icon" />
                    </div>

                    {isLogin ? (
                        user.uid === "c7AuRE4B7seWFWqo8Ty0F3hCL1f2" ? (
                            adminLogin.map((navbar) => (
                                <Link href={navbar.link} key={navbar.name} className="hidden lg:block">
                                    <button className="text-white text-xl font-medium hover:bg-emerald-600">{navbar.name}</button>
                                </Link>
                            ))
                        ) : (
                            userLogin.map((navbar) => (
                                <Link href={navbar.link} key={navbar.name} className="hidden lg:block">
                                    <button className="text-white text-xl font-medium hover:bg-emerald-600">{navbar.name}</button>
                                </Link>
                            ))
                        )
                    ) : (
                        notLogin.map((navbar) => (
                            <Link href={navbar.link} key={navbar.name} className="hidden lg:block">
                                <button className="text-white text-xl font-medium hover:bg-emerald-600">{navbar.name}</button>
                            </Link>
                        ))
                    )}
                </div>

                <div className="flex items-center gap-x-14">
                    <div className="lg:hidden">
                        <button onClick={toggleNavbar}>
                            {isOpen ? (
                                <p>X</p>
                            ) : (
                                <Image src={Menu} alt="Menu" />
                            )}
                        </button>
                    </div>
                    {!isLogin ? (
                        <>
                            <Link href="/login" className="hidden lg:block">
                                <button className="text-white text-xl font-medium hover:bg-emerald-600">Login</button>
                            </Link>
                            <Link href="/signup" className="hidden lg:block">
                                <button className="text-white text-xl font-medium hover:bg-emerald-600">Signup</button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/" className="hidden lg:block">
                            <button className="text-white text-xl font-medium hover:bg-emerald-600" onClick={handleLogout}>Logout</button>
                        </Link>
                    )}
                </div>

            </div>
            {isOpen ? (
            <div className="fixed inset-0 bg-black bg-opacity-50">
                <div className="flex w-full items-center justify-between px-[20px] py-[16px] bg-[#7AB2B2]">
                    <div>
                        <Image src={Icon} alt="Icon" />
                    </div>

                    <button onClick={toggleNavbar}>
                        {isOpen ? (
                            <p>X</p>
                        ) : (
                            <Image src={Menu} alt="Menu" />
                        )}
                    </button>
                </div>

                {isLogin ? (
                        user.uid === "c7AuRE4B7seWFWqo8Ty0F3hCL1f2" ? (
                            adminLogin.map((navbar) => (
                                <Link href={navbar.link} key={navbar.name} className="">
                                    <button className="text-white text-xl font-medium w-full px-[20px] py-[16px] bg-[#7AB2B2]">{navbar.name}</button>
                                </Link>
                            ))
                        ) : (
                            userLogin.map((navbar) => (
                                <Link href={navbar.link} key={navbar.name} className="">
                                    <button className="text-white text-xl font-medium w-full px-[20px] py-[16px] bg-[#7AB2B2]">{navbar.name}</button>
                                </Link>
                            ))
                        )
                    ) : (
                        notLogin.map((navbar) => (
                            <Link href={navbar.link} key={navbar.name} className="">
                                <button className="text-white text-xl font-medium w-full px-[20px] py-[16px] bg-[#7AB2B2]">{navbar.name}</button>
                            </Link>
                        ))
                    )}

                    {!isLogin ? (
                        <>
                            <Link href="/login" className="">
                                <button className="text-white text-xl font-medium w-full px-[20px] py-[16px] bg-[#7AB2B2]">Login</button>
                            </Link>
                            <Link href="/signup" className="">
                                <button className="text-white text-xl font-medium w-full px-[20px] py-[16px] bg-[#7AB2B2]">Signup</button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/" className="">
                            <button className="text-white text-xl font-medium w-full px-[20px] py-[16px] bg-[#7AB2B2]" onClick={handleLogout}>Logout</button>
                        </Link>
                    )}
            </div>
            ) : (
                <></>   
            )}
        </nav>
    )
}