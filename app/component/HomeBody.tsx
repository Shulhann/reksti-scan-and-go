import Image from "next/image"
import Car from "../../public/car.svg"
import Link from "next/link";

export function HomeBody() {
    return (
        <div className="w-full bg-[#CDE8E5]">
            <div className="flex justify-end pt-20 pr-10 lg:hidden">
                <Image src={Car} alt="Car" />
            </div>

            <div className="flex justify-between">
                <div className="lg:ml-20">
                    <p className="text-4xl font-bold mt-10 mr-20 ml-10 lg:mt-40 ">
                        Mempermudah urusan parkir-memarkir kendaraanmu
                    </p>
                    <p className="text-lg font-medium mt-5 mr-20 ml-10 lg:mt-10">
                        bayar parkir tinggal scan dan go aja!
                    </p>
                    <Link href="/signup" className="lg:mt-10">
                            <button className="text-white text-lg font-medium bg-[#4D869C] mt-5 px-5 py-1 ml-10 rounded-md" >Daftar sekarang!</button>
                    </Link>
                </div>

                <div className="hidden lg:block lg:mt-20 lg:mr-40">
                    <Image src={Car} alt="Car" className="" />
                </div>
            </div>
        </div>
    );
}