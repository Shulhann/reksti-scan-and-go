"use client";

import Image from "next/image"
import Icon from "../../public/icon.svg"
import Menu from "../../public/Menu.svg"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthProvider";

export function Navbar() {
    const { isLogin, signOut, user} = useAuth();

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
                        <Image src={Menu} alt="Menu" />
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
        </nav>
    )
}