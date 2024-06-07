import Image from "next/image"
import Icon from "../../public/icon.svg"
import Menu from "../../public/Menu.svg"
import Link from "next/link"

export function Navbar() {
    return (
        <nav className="flex w-full bg-[#7AB2B2]">
            <div className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
                <div className="flex items-center gap-x-14">
                    <div>
                        <Image src={Icon} alt="Icon" />
                    </div>
                    <Link href="/" className="hidden lg:block">
                        <button className="text-white text-xl font-medium hover:bg-emerald-600">About</button>
                    </Link>
                    <Link href="/as" className="hidden lg:block">
                        <button className="text-white text-xl font-medium hover:bg-emerald-600">Profil</button>
                    </Link>
                    <Link href="/pengguna" className="hidden lg:block">
                        <button className="text-white text-xl font-medium hover:bg-emerald-600">Pengguna</button>
                    </Link>
                    <Link href="/as" className="hidden lg:block">
                        <button className="text-white text-xl font-medium hover:bg-emerald-600">Riwayat</button>
                    </Link>
                </div>

                <div className="flex items-center gap-x-14">
                    <div className="lg:hidden">
                        <Image src={Menu} alt="Menu" />
                    </div>
                    <Link href="/login" className="hidden lg:block">
                        <button className="text-white text-xl font-medium hover:bg-emerald-600">Login</button>
                    </Link>
                    <Link href="/signup" className="hidden lg:block">
                        <button className="text-white text-xl font-medium hover:bg-emerald-600">Signup</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}