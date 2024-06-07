import Image from "next/image"
import Car from "../../public/car.svg"





export function LoginBody() {
    return (
        <div className="w-full bg-[#CDE8E5] h-screen">
            <div className="flex justify-between w-full h-screen">
                <div className="flex justify-center w-full h-screen">
                    <div className="w-5/6 h-2/3 mt-10 bg-white rounded-xl lg:w-2/5 lg:h-2/3">
                        <p className="text-4xl text-center font-bold mt-10">Login</p>
                        <form action="">
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-10 mx-12">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="grid grid-cols-1 items-center gap-1.5 mt-5 mx-12">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" className="border-solid border-2 border-grey-400"/>
                            </div>
                            <div className="flex justify-center items-center gap-1.5 mt-10 mx-12">
                                <button className="text-white text-lg w-full font-medium bg-[#4D869C] py-1  rounded-2xl">Login</button>
                            </div>
                            <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                                <p className="text-center">atau</p>
                            </div>
                            <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                                <button className="text-lg font-medium w-full py-1 rounded-2xl border-solid border-2 border-grey-400">Login dengan google</button>
                            </div>
                            <div className="flex justify-center items-center gap-1.5 mt-2 mx-12">
                                <p className="text-center">belum memiliki akun?<a href="/signup" className="text-[#4A4AE4]"> signup</a> disini</p>

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