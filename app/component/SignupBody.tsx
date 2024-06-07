import Image from "next/image"
import Car from "../../public/car.svg"

export function SignupBody() {
    return (
        <div className="w-full bg-[#CDE8E5] h-screen">
            <div className="flex justify-between w-full h-screen">
                <div className="flex justify-center w-full h-screen">
                    <div className="w-5/6 h-5/6 mt-10 bg-white rounded-xl lg:w-3/5 lg:h-5/6">
                        <p className="text-4xl text-center font-bold mt-10">Sign up for free!!</p>
                        <form action="">
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-10 mx-12">
                                <label htmlFor="nama">Nama</label>
                                <input type="nama" id="nama" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                                <label htmlFor="nim">NIM</label>
                                <input type="nim" id="nim" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                                <label htmlFor="platMotor">Plat Motor</label>
                                <input type="platMotor" id="platMotor" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                                <label htmlFor="saldo">Saldo</label>
                                <input type="saldo" id="saldo" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-3 mx-12">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" className="border-solid border-2 border-grey-400"/>
                            </div>

                            <div className="flex justify-center items-center gap-1.5 mt-10 mx-12">
                                <button className="text-white text-lg w-full font-medium bg-[#4D869C] py-1 rounded-2xl">Sign Up</button>
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